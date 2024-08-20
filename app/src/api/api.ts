import axios from 'axios';
import { createApiClient } from './schema';

export const revalidate = 120;

const baseURL =
  (typeof window === 'undefined'
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL) ?? '';

const axiosClient = axios.create({
  baseURL,
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
    const accessToken = localStorage.getItem('accessToken');
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
      localStorage.setItem('accessToken', response.token);

      return axiosClient(originalRequest);
    }

    return Promise.reject(error);
  },
);
