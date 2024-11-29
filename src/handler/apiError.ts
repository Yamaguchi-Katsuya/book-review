import { ApiError, newApiError } from "@/types/error";
import axios from "axios";

export const handleApiError = (err: any): ApiError => {
  if (axios.isAxiosError(err) && err.response) {
    const errorResponse = err.response.data;
    return newApiError(errorResponse.ErrorCode, errorResponse.ErrorMessageJP, errorResponse.ErrorMessageEN);
  };
  return newApiError(err.response?.status || 500, "予期しないエラーが発生しました", "Unexpected error occurred");
}
