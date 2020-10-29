import axios from 'axios';

let url;

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3333/api';
} else {
  url = process.env.REACT_APP_API_URL;
}

const api = axios.create({
  baseURL: url,
});

export default api;
