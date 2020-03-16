import axios from 'axios';

const PROXY_URL = 'http://localhost:5000/';

const axiosInstance = axios.create({
  baseURL: `${PROXY_URL}https://api.nestoria.co.uk`,
  timeout: 5000,
  timeoutErrorMessage: 'An error occurred while searching. Please check your network connection and try again',
});

export default axiosInstance;
