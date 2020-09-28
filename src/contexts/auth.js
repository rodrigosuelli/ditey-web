import React, { useState, useEffect, createContext, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({ authenticated: false });

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthenticated() {
      let response;

      try {
        const storageToken = localStorage.getItem('token');

        if (!storageToken) {
          return;
        }

        response = await api.post('/auth/verify');

        const parseRes = await response.json();
        console.log(parseRes);

        if (parseRes === true) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.log(response.data.msg);
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

      const storageToken = localStorage.getItem('token');
      api.defaults.headers.Authorization = `Bearer ${storageToken}`;
    } catch (err) {
      alert('Erro ao tentar criar conta, tente novamente.');
    }
  }

  async function logIn(data) {
    let response;

    try {
      response = await api.post('/auth/login', data);

      const userInfo = { name: response.data.name, email: response.data.email };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      const storageToken = localStorage.getItem('token');
      api.defaults.headers.Authorization = `Bearer ${storageToken}`;
    } catch (err) {
      console.log(err);
      alert(err);
      console.log(response);
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
