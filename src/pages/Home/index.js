import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';

import './styles.css';

export default function Home() {
  return (
    <Layout>
      <h1 className="slogan">
        Trabalhe com textos na velocidade do som<span>.</span>
      </h1>
      <p className="sub">
        Chega de se estressar lendo e copiando textos e artigos longos.
      </p>
      <Link to="/dashboard" className="primary">
        Acessar a plataforma
      </Link>
    </Layout>
  );
}
