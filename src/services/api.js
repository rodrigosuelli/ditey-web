import axios from 'axios';

let url;

if (process.env.NODE_ENV === 'development') {
  url = 'http://192.168.0.108:3333/api';
} else {
  url = 'https://ditey-api-deploy.herokuapp.com/api';
}

const api = axios.create({
  baseURL: url,
});

export default api;
