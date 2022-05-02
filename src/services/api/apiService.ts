import axios from 'axios';
import config from '../config';

const apiClient = axios.create(config.api);

// Request interceptor
apiClient.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      config.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    config.headers.common['Content-Type'] = 'application/json';
    config.headers.common['Accept'] = 'application/json';

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Clear local storage data and redirect to login page if request is 401 - Unauthorized
    if (error.response.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default apiClient;
