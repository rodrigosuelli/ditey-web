import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';
import { AuthProvider } from './contexts/auth';

import './global.css';

ReactDOM.render(
  <AuthProvider>
    <Routes />
  </AuthProvider>,
  document.getElementById('root')
);
