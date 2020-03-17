import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.REACT_APP_PROXY_URL}/${process.env.REACT_APP_NESTORIA_URL}`,
  timeout: 5000,
  timeoutErrorMessage: 'Network connection issues / timeout',
});
