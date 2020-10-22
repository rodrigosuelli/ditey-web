import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext({ authenticated: false });

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  function storeTokens(data) {
    let userInfo;

    if (data.name && data.email) {
      userInfo = { name: data.name, email: data.email };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
  }

  const refreshToken = useCallback(async () => {
    const storageRefreshToken = localStorage.getItem('refreshToken');

    if (!storageRefreshToken) {
      setAuthenticated(false);

      return false;
    }

    const data = {
      refreshToken: storageRefreshToken,
    };

    try {
      const response = await api.post('/auth/refresh-token', data);

      storeTokens(response.data);

      setAuthenticated(true);

      return true;
    } catch (error) {
      setAuthenticated(false);

      return false;
    }
  }, []);

  useEffect(() => {
    async function checkAuthenticated() {
      try {
        const response = await api.post('/auth/verify');

        if (response.data === true) {
          setAuthenticated(true);
        }
      } catch (error) {
        if (error.response.data.msg === 'invalid token') {
          await refreshToken();
        }
      }

      setLoading(false);
    }

    const storageToken = localStorage.getItem('token');

    if (storageToken) {
      api.defaults.headers.Authorization = `Bearer ${storageToken}`;
    }

    checkAuthenticated();
  }, [refreshToken]);

  async function createAccount(data) {
    try {
      const response = await api.post('/auth/register', data);

      storeTokens(response.data);

      setAuthenticated(true);

      history.push('/dashboard');
    } catch (err) {
      alert(err.response.data);
    }
  }

  async function logIn(data) {
    try {
      const response = await api.post('/auth/login', data);

      storeTokens(response.data);

      setAuthenticated(true);

      history.push('/dashboard');
    } catch (err) {
      alert(err.response.data);
    }
  }

  function logOut() {
    setAuthenticated(false);

    localStorage.clear();

    api.defaults.headers.Authorization = undefined;

    history.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        refreshToken,
        createAccount,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
