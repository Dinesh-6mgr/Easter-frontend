import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ message: 'Request timeout. Please try again.' });
    }
    
    if (!error.response) {
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    }
    
    // Handle specific HTTP status codes
    switch (error.response.status) {
      case 400:
        return Promise.reject({ 
          message: error.response.data.message || 'Invalid request',
          errors: error.response.data.errors 
        });
      case 404:
        return Promise.reject({ message: 'Resource not found' });
      case 429:
        return Promise.reject({ message: 'Too many requests. Please try again later.' });
      case 500:
        return Promise.reject({ message: 'Server error. Please try again later.' });
      default:
        return Promise.reject(error.response.data);
    }
  }
);

export default api;