import { API_BASE_URL } from "@/const";
import { handleApiError } from "@/handler/apiError";
import { ApiError, newApiError } from "@/types/error";
import { IconUploadApiRequest, IconUploadApiResponse, LoginApiRequest, LoginApiResponse, SignUpApiRequest, SignUpApiResponse, User } from "@/types/user";
import axios from "axios";
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const signUp = async (request: SignUpApiRequest): Promise<SignUpApiResponse | ApiError> => {
  return await axios.post(`${API_BASE_URL}/users`, request)
    .then((res) => {
      return res.data as SignUpApiResponse;
    })
    .catch((err) => {
      return handleApiError(err);
    })
}

export const login = async (request: LoginApiRequest): Promise<LoginApiResponse | ApiError> => {
  return await axios.post(`${API_BASE_URL}/signin`, request)
    .then((res) => {
      return res.data as LoginApiResponse;
    })
    .catch((err) => {
      return handleApiError(err);
    });
}

export const getUser = async (token: string): Promise<User | ApiError> => {
  return await axios.get(`${API_BASE_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((res) => {
      return {
        name: res.data.name,
        iconUrl: res.data.iconUrl,
      }
    })
    .catch((err) => {
      return handleApiError(err);
    });
}

export const iconUpload = async (request: IconUploadApiRequest, token: string): Promise<IconUploadApiResponse | ApiError> => {
  if (!token) {
    return newApiError(401, "トークンがありません", "Token is missing");
  }

  return await axios.post(`${API_BASE_URL}/uploads`, request, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      return {
        iconUrl: res.data.iconUrl,
      }
    })
    .catch((err) => {
      return handleApiError(err);
    });
}
