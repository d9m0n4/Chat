import axios, { AxiosError } from 'axios';
import { config } from 'dotenv';

export const BASE_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem('jwt');
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { Authorization: `Bearer ${token}` },
});

api.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config) {
      try {
        const refreshResponse = await axios.get(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('jwt', refreshResponse.data.accessToken);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return api.request(originalRequest!);
      } catch (e) {
        localStorage.removeItem('jwt');
        window.location.href = '/';
        console.log(e);
      }
    }
    throw error;
  }
);
