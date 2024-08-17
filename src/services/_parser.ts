export const isTokenExpired = (status: number): boolean => status === 401;

export const hasInternalServerError = (status: number): boolean =>
  status !== 200 && status !== 201;

export const serverIndicatesError = (serverRes: any): boolean => {
  return (
    serverRes.Success === false ||
    serverRes.success === false ||
    serverRes.error === true ||
    serverRes.Error === true
  );
};

export const dataParser = (serverRes: any): any =>
  serverRes.Body || serverRes.body || serverRes;

export const errorMessageParser = (serverRes: any): string => {
  return (
    serverRes.Description ||
    serverRes.description ||
    serverRes.ErrorMessage ||
    serverRes.errorMessage ||
    serverRes.Message ||
    serverRes.message ||
    serverRes.Text ||
    serverRes.text ||
    serverRes.Txt ||
    serverRes.txt ||
    serverRes.data?.ErrorMessage ||
    serverRes.data?.errorMessage ||
    serverRes.Data?.ErrorMessage ||
    serverRes.Data?.errorMessage ||
    serverRes.body?.ErrorMessage ||
    serverRes.body?.errorMessage ||
    serverRes.Body?.ErrorMessage ||
    serverRes.Body?.errorMessage ||
    (typeof serverRes.Error === "string" && serverRes.Error) ||
    (typeof serverRes.error === "string" && serverRes.error) ||
    "The transaction encountered an error."
  );
};

export const successMessageParser = (serverRes: any): string => {
  return (
    serverRes.Description ||
    serverRes.description ||
    serverRes.SuccessMessage ||
    serverRes.successMessage ||
    serverRes.Message ||
    serverRes.message ||
    serverRes.Text ||
    serverRes.text ||
    serverRes.Txt ||
    serverRes.txt ||
    serverRes.data?.SuccessMessage ||
    serverRes.data?.successMessage ||
    serverRes.Data?.SuccessMessage ||
    serverRes.Data?.successMessage ||
    serverRes.body?.SuccessMessage ||
    serverRes.body?.successMessage ||
    serverRes.Body?.SuccessMessage ||
    serverRes.Body?.successMessage ||
    (typeof serverRes.Success === "string" && serverRes.Success) ||
    (typeof serverRes.success === "string" && serverRes.success) ||
    "The transaction was successful."
  );
};

export default {
  isTokenExpired,
  hasInternalServerError,
  serverIndicatesError,
  dataParser,
  errorMessageParser,
  successMessageParser,
};
