import axios, { AxiosError } from 'axios';
import { createApiClient } from './schema';
import { getAccessToken, setAccessToken } from '@/utils/tokenStorage';
import { toast } from 'react-toastify';

export const revalidate = 120;

const apiURL = process.env.NEXT_PUBLIC_API_URL;
export const serverApiURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const baseURL =
  (typeof window === 'undefined' ? serverApiURL : apiURL) ?? '';

const axiosClient = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = createApiClient((method, url, params) => {
  // https://github.com/astahmer/typed-openapi/issues/19
  if (params?.path) {
    Object.entries(params.path).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, String(value));
    });
  }

  return axiosClient(url, {
    method,
    data: params?.body,
    params: params?.query,
  }).then(({ data }) => data);
}, baseURL);

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await api.post('/api/auth');
      originalRequest.headers.Authorization = `Bearer ${response.token}`;
      setAccessToken(response.token);

      return axiosClient(originalRequest);
    }

    if (error instanceof AxiosError && error.response?.data) {
      const { data } = error.response;
      if (data?.message) {
        toast.error(
          Array.isArray(data.message) ? data.message[0] : data.message,
        );
      }
      return Promise.reject(data);
    }

    return Promise.reject(error);
  },
);

export class ApiError extends Error {
  // constructor(public data: Schemas.)
}
