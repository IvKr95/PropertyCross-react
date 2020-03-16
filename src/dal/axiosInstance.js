import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_PROXY_URL}/${process.env.REACT_APP_NESTORIA_URL}`,
  timeout: 5000,
  timeoutErrorMessage: 'An error occurred while searching. Please check your network connection and try again',
});

export default axiosInstance;
