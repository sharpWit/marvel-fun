import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import env from "./env";

interface Parsers {
  serverIndicatesError: (response: any) => boolean;
  isTokenExpired: (status: number) => boolean;
  dataParser: (data: any) => any;
  errorMessageParser: (response: any) => string;
  successMessageParser: (response: any) => string;
  hasInternalServerError: (status: number) => boolean;
}

interface Session {
  logout: () => void;
  getData: () => { token: string };
}

interface Options extends AxiosRequestConfig {
  urlParams?: Record<string, any>;
  onSuccess?: (data: any, response: any) => void;
  onError?: (error: any) => void;
  onComplete?: (data: any, response?: any) => void;
  onLoadData?: (data: any, response?: any) => void;
  files?: { key: string; file: File }[];
}

export default class BaseClass {
  protected _serverIndicatesError: Parsers["serverIndicatesError"];
  protected _isTokenExpired: Parsers["isTokenExpired"];
  protected _dataParser: Parsers["dataParser"];
  protected _errorMessageParser: Parsers["errorMessageParser"];
  protected _successMessageParser: Parsers["successMessageParser"];
  protected _hasInternalServerError: Parsers["hasInternalServerError"];
  protected _isManual: boolean;
  protected _session?: Session;
  protected _options: Options;

  constructor(
    parsers: Parsers,
    options: Options,
    session?: Session,
    isManual: boolean = false
  ) {
    const {
      serverIndicatesError,
      isTokenExpired,
      dataParser,
      errorMessageParser,
      successMessageParser,
      hasInternalServerError,
    } = parsers;
    this._serverIndicatesError = serverIndicatesError;
    this._isTokenExpired = isTokenExpired;
    this._dataParser = dataParser;
    this._errorMessageParser = errorMessageParser;
    this._successMessageParser = successMessageParser;
    this._hasInternalServerError = hasInternalServerError;
    this._isManual = isManual;
    this._session = session;
    this._options = this._setOptions(options);
  }

  protected xhr(options: AxiosRequestConfig) {
    return axios(options);
  }

  protected _validateServerResponse({
    serverRes,
    status,
  }: {
    serverRes: any;
    status: number;
  }) {
    let expiredTokenMessage: string | undefined;
    if (this._isTokenExpired(status)) {
      expiredTokenMessage = "Please log in to the application.";
      this._session && this._session.logout();
    }

    if (
      !serverRes ||
      !status ||
      this._isTokenExpired(status) ||
      this._hasInternalServerError(status) ||
      this._serverIndicatesError(serverRes)
    ) {
      return Promise.reject({
        message:
          expiredTokenMessage || this._errorMessageParser(serverRes || {}),
        status,
      });
    }
    return Promise.resolve({
      data: this._dataParser(serverRes),
      message: this._successMessageParser(serverRes),
      status,
    });
  }

  protected extractSuccessResponse(res: AxiosResponse) {
    return Promise.resolve({ serverRes: res.data, status: res.status });
  }

  protected extractFailedResponse(res: any) {
    const { response } = res;
    return Promise.resolve({
      serverRes: response?.data,
      status: response?.status,
    });
  }

  public sendRequest() {
    if (this._isManual) {
      return this.xhr(this._options);
    }
    const promise = this.xhr(this._options)
      .then(this.extractSuccessResponse.bind(this))
      .catch(this.extractFailedResponse.bind(this))
      .then(this._validateServerResponse.bind(this));
    this.toast(promise);
    return this._executeCallbacks(promise);
  }

  protected toast(promise: Promise<any>) {}

  private _executeCallbacks(promise: Promise<any>) {
    return promise
      .catch((res) => {
        this._options.onError?.(res);
        this._options.onComplete?.(res);
        return Promise.reject(res);
      })
      .then((res) => {
        this._options.onLoadData?.(res.data, res);
        this._options.onSuccess?.(res.data, res);
        this._options.onComplete?.(res.data, res);
        return Promise.resolve(res.data);
      });
  }

  private _setOptions(op: Options): Options {
    const options = Object.assign(this._getDefaultOptions(), op);
    options.headers = Object.assign(this._getDefaultHeader(), options.headers);
    options.url = (env.API_URL ?? "") + (options.url ?? "");
    if (options.urlParams && typeof options.urlParams === "object") {
      Object.entries(options.urlParams).forEach(([paramName, paramValue]) => {
        options.url = options.url?.replace("{" + paramName + "}", paramValue);
      });
    }
    this._checkFormDataType(options);
    return options;
  }

  private _getDefaultOptions(): Options {
    return {
      method: "get",
      url: "",
      urlParams: undefined,
      headers: {},
      onSuccess: () => {},
      onError: () => {},
      onComplete: () => {},
      onLoadData: () => {},
    };
  }

  private _getDefaultHeader(): Record<string, string> {
    const header: Record<string, string> = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    if (this._session) {
      header.Authorization = "Bearer " + this._session.getData().token;
    }
    return header;
  }

  private _checkFormDataType(op: Options) {
    if (op.headers?.["Content-Type"] === "multipart/form-data") {
      const formData = new FormData();
      Object.keys(op.data || {}).forEach((key) => {
        formData.append(key, (op.data as Record<string, any>)[key]);
      });
      const files = op.files || [];
      files.forEach((fileData: { key: string; file: File }) => {
        formData.append(fileData.key, fileData.file, fileData.file.name);
      });
      op.data = formData;
    }
  }
}
