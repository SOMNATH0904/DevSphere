import {privateClient as apiClient} from '@services';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AuthService = {
  signup: formData => apiClient.post('/auth/signup', formData),

  signin: formData => apiClient.post('/auth/signin', formData),

  signout: () => apiClient.get('/auth/signout'),

  checkAuthStatus: () => apiClient.get('/auth/status'),

  googleSignin: () =>
    window.open(
      `${baseURL.endsWith('/') ? baseURL : `${baseURL}/`}auth/google`,
      '_self',
    ),
};

export default AuthService;
