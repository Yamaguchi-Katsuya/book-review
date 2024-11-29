export type ApiError = {
  error: boolean;
  errorCode: number;
  errorMessageJP: string;
  errorMessageEN: string;
};

export const newApiError = (errorCode: number, errorMessageJP: string, errorMessageEN: string): ApiError => {
  return {
    error: true,
    errorCode,
    errorMessageJP,
    errorMessageEN,
  }
}
