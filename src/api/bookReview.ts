import axios from "axios";
import { ApiError } from "../types/error";
import { GetBookReviewsRequest, GetBookReviewsResponse } from "../types/bookReview";
import { API_BASE_URL } from "@/const";

export const getPublicBookReviews = async (
  request: GetBookReviewsRequest = {
    offset: 0,
  }
): Promise<GetBookReviewsResponse | ApiError> => {
  return await axios.get(`${API_BASE_URL}/public/books`, {
    params: request,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getPrivateBookReviews = async (
  request: GetBookReviewsRequest,
  token: string
): Promise<GetBookReviewsResponse | ApiError> => {
  return await axios.get(`${API_BASE_URL}/books`, {
    params: request,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
