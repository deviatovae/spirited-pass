import axios from 'axios';
import { createApiClient } from './schema';
import { getAccessToken, setAccessToken } from '@/utils/tokenStorage';

export const revalidate = 120;

const apiURL = process.env.NEXT_PUBLIC_API_URL;
export const serverApiURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const baseURL =
  ((typeof window === 'undefined' ? serverApiURL : apiURL) ?? '') + 'api';

const axiosClient = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = createApiClient(
  (method, url, params) =>
    axiosClient(url, {
      method,
      data: params?.body,
      params: params?.query,
    }).then(({ data }) => data),
  baseURL,
);

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
      const response = await api.post('/auth');
      originalRequest.headers.Authorization = `Bearer ${response.token}`;
      setAccessToken(response.token);

      return axiosClient(originalRequest);
    }

    return Promise.reject(error);
  },
);
