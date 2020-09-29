import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ditey-api-deploy.herokuapp.com/api',
});

const storageToken = localStorage.getItem('token');

if (storageToken) {
  api.defaults.headers.Authorization = `Bearer ${storageToken}`;
}

export default api;
