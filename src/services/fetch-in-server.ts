import BaseClass from "./base";
import parsers from "./_parser";
import { AxiosRequestConfig, AxiosResponse } from "axios";

interface ISession {
  logout: () => void;
  getData: () => { token: string };
}

interface FetchOptions extends RequestInit {
  url: string;
  data?: any;
  onSuccess?: (data: any, response: any) => void;
  onError?: (error: any) => void;
  onComplete?: (data: any, response?: any) => void;
  onLoadData?: (data: any, response?: any) => void;
}

// If you need to support both Axios and Fetch in the base class, you could create a union type
type Options = AxiosRequestConfig | FetchOptions;

class ServerAxiosAdapterClass extends BaseClass {
  constructor(
    parsers: any,
    options: Options,
    session?: ISession,
    isManual?: boolean
  ) {
    // Cast options to AxiosRequestConfig for BaseClass compatibility
    super(parsers, options as AxiosRequestConfig, session, isManual);
  }

  // New method for Fetch requests
  private fetchRequest(options: FetchOptions): Promise<Response> {
    const { url, ...rest } = options;
    if (rest.data) {
      rest.body = JSON.stringify(rest.data);
    }
    return fetch(url, rest);
  }

  // Override sendRequest to handle both fetch and axios
  public sendRequest(): Promise<any> {
    const isFetchRequest =
      this._options.hasOwnProperty("url") &&
      typeof (this._options as FetchOptions).url === "string";

    if (isFetchRequest) {
      return this.fetchRequest(this._options as FetchOptions)
        .then((res) => this.extractSuccessResponse(res))
        .catch((res) => this.extractFailedResponse(res))
        .then((res) => this._validateServerResponse(res));
    } else {
      return super.sendRequest();
    }
  }

  // Override extractSuccessResponse to handle both fetch and axios responses
  protected extractSuccessResponse(
    res: AxiosResponse | Response
  ): Promise<{ serverRes: any; status: number }> {
    if (res instanceof Response) {
      return res.json().then((serverRes) => {
        return Promise.resolve({ serverRes, status: res.status });
      });
    } else {
      return Promise.resolve({ serverRes: res.data, status: res.status });
    }
  }

  // Override extractFailedResponse to handle both fetch and axios responses
  protected extractFailedResponse(
    res: Response | AxiosResponse
  ): Promise<{ serverRes: any; status: number }> {
    if (res instanceof Response) {
      return res.json().then((serverRes) => {
        return Promise.resolve({ serverRes, status: res.status });
      });
    } else {
      const { response } = res as any; // Handle axios response
      return Promise.resolve({
        serverRes: response?.data,
        status: response?.status,
      });
    }
  }
}

export default function AxiosAdapter(
  options: Options,
  session?: ISession,
  manual?: boolean
): Promise<any> {
  const axiosAdapter = new ServerAxiosAdapterClass(
    parsers,
    options,
    session,
    manual
  );
  return axiosAdapter.sendRequest().catch((Errors) => {
    return Promise.resolve({
      ...Errors,
      errorMessage: Errors.message,
      status: Errors.status,
    });
  });
}
