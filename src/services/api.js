import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ditey-api-deploy.herokuapp.com/api',
});

export default api;
