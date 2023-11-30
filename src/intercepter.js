import axios from 'axios';

const apiEndpoint = 'http://127.0.0.1:8000/bankapp/';

const axiosPrivate = axios.create({
  baseURL: apiEndpoint,
  headers: {
    'Content-Type': 'application/json',
   
  },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Request Config:', config); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
    
        try {
          const accessToken = await refreshAccessToken();
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosPrivate(originalRequest);
        } catch (refreshError) {
          console.error('Error occurred during token refresh:', refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);


const refreshAccessToken = async () => {
 
  const authTokens = JSON?.parse(localStorage.getItem('token') || '{}');

  const refreshToken = authTokens.refreshToken;
  const data = { refreshToken: refreshToken };

  try {
    const response = await axiosPrivate.post('refresh-token/', data);
    const accessToken = response?.data?.accessToken;

    if (accessToken) {
      const updatedAuthTokens = JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      localStorage.setItem('token', updatedAuthTokens);
      return accessToken;
    } else {
      return Promise.reject(new Error('Invalid access token in refresh response'));
    }
  } catch (err) {
    console.error('Error occurred in generating refresh token:', err);
    return Promise.reject(err);
  }
};

export { axiosPrivate };
