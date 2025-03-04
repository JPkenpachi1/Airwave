import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to attach the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling 401 errors and refreshing token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if it's a 401 error and not retried before
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken,
          });

          // Store new access token
          localStorage.setItem('access_token', response.data.access);

          // Retry the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error('Refresh token expired or invalid.');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login'; // Redirect user to login
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
