import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const createAxiosInstance = withCredentials => {
  return axios.create({
    baseURL,
    withCredentials,
  });
};

const handleAuthError = async error => {
  const originalRequest = error?.config;
  if (error?.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      await axios.post(
        `${baseURL.endsWith('/') ? baseURL : `${baseURL}/`}auth/refresh`,
        {withCredentials: true},
      );
      console.log('Token refreshed successfully');
    } catch (refreshError) {
      console.error('Error refreshing token:', refreshError);
    }
  }
  return Promise.reject(error);
};

const publicClient = createAxiosInstance(false);

const privateClient = createAxiosInstance(true);
privateClient.interceptors.response.use(response => response, handleAuthError);

export {publicClient, privateClient};
