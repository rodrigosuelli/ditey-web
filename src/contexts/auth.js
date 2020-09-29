import React, { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext({ authenticated: false });

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function refreshToken() {
      try {
        const storageRefreshToken = localStorage.getItem('refreshToken');

        const data = {
          refreshToken: storageRefreshToken,
        };

        const response = await api.post('/auth/refresh-token', data);

        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      } catch (error) {
        alert(error);
      }
    }

    async function checkAuthenticated() {
      try {
        const response = await api.post('/auth/verify');

        if (response.data === true) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        if (error.response.data.msg === 'invalid token') {
          refreshToken();
        }
      }
    }

    checkAuthenticated();

    setLoading(false);
  }, []);

  async function createAccount(data) {
    try {
      const response = await api.post('/auth/register', data);

      const userInfo = { name: response.data.name, email: response.data.email };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setAuthenticated(true);

      history.push('/dashboard');
    } catch (err) {
      alert(err.response.data);
    }
  }

  async function logIn(data) {
    try {
      const response = await api.post('/auth/login', data);

      const userInfo = { name: response.data.name, email: response.data.email };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setAuthenticated(true);

      history.push('/dashboard');
    } catch (err) {
      alert(err.response.data);
    }
  }

  function logOut() {
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, createAccount, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
