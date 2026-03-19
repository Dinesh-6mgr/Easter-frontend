import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ message: 'Request timeout. Please try again.' });
    }
    if (!error.response) {
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    }
    const { status, data } = error.response;
    if (status === 429) return Promise.reject({ message: 'Too many requests. Please try again later.' });
    return Promise.reject({ message: data?.message || 'Something went wrong.', errors: data?.errors });
  }
);

export default api;
