import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import { AuthProvider } from './contexts/auth';

import './global.css';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
