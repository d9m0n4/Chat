import axios, { AxiosError } from 'axios';

export const BASE_URL = 'http://localhost:5000';
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
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
    const orginalRequest = error.config;
    if (error.response?.status === 401 && error.config) {
      try {
        const refreshResponse = await axios.get(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('jwt', JSON.stringify(refreshResponse.data));
        return api.request(orginalRequest!);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);
