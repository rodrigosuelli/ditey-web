import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../../components/Layout/Layout';
import CardGroup from './CardGroup/CardGroup';

import './Team.css';

export default function Team() {
  return (
    <Layout>
      <Helmet title="Ditey - Nosso Time" />

      <div id="team-page">
        <h1 className="title">Nosso Time</h1>

        <h2>
          <span role="img" aria-label="programmer emoji">
            👨‍💻
          </span>
          Desenvolvimento:
        </h2>
        <CardGroup group="Development" />

        <h2>
          <span role="img" aria-label="programmer emoji">
            📝
          </span>
          Documentação:
        </h2>
        <CardGroup group="Documentation" />
      </div>
    </Layout>
  );
}
