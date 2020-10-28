import axios from 'axios';

let url;

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3333/api';
} else {
  url = 'https://ditey-api-deploy.herokuapp.com/api';
}

const api = axios.create({
  baseURL: url,
});

export default api;
