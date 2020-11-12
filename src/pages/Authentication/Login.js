import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MdMailOutline, MdLockOutline } from 'react-icons/md';

import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../contexts/auth';

import './Authentication.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logIn } = useAuth();

  function handleLogin(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    logIn(data);
  }

  return (
    <Layout>
      <main>
        <Helmet title="Ditey - Log in" />

        <h1 className="slogan">Faça login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <MdMailOutline size={22} className="input-icon" />
            <input
              required
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <MdLockOutline size={22} className="input-icon" />
            <input
              required
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="primary" type="submit">
            Entrar
          </button>
        </form>
        <p>
          Não tem uma conta?{' '}
          <Link className="link" to="/register">
            Registre-se
          </Link>
        </p>
      </main>
    </Layout>
  );
}
