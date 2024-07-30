import React from 'react';
import { HashLink } from 'react-router-hash-link';

import logoImg from '../../../images/svg/ditey-logo.svg';

import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-container">
          <HashLink smooth to="/#">
            <img src={logoImg} alt="logo" />
          </HashLink>

          <span>
            O leitor de textos mais completo <br /> do mercado.
          </span>
          <p className="copyright">Copyright © Ditey 2020</p>
        </div>

        <div className="links">
          <h4>Links</h4>
          <HashLink smooth to="/#">
            Home
          </HashLink>
          <HashLink smooth to="/team#">
            Nosso Time
          </HashLink>
          <HashLink smooth to="/register#">
            Cadastro
          </HashLink>
          <HashLink smooth to="/login#">
            Log in
          </HashLink>
        </div>

        <div className="links">
          <h4>Ferramentas utilizadas</h4>
          <a
            href="https://github.com/rodrigosuelli/ditey-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
          <a
            href="https://www.heroku.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Heroku
          </a>
          <a
            href="https://www.figma.com/file/hgQpYoXRdoP9ht9JF1V26N/Ditey?node-id=0%3A1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Figma
          </a>
          <a
            href="https://level-ketchup-8ad.notion.site/Ditey-281be863afaf4b70bce904a9e087888d"
            target="_blank"
            rel="noopener noreferrer"
          >
            Notion
          </a>
          <a
            href="https://whimsical.com/8xLfNqYQcrkdqKY2SqvpSR"
            target="_blank"
            rel="noopener noreferrer"
          >
            Whimsical
          </a>
        </div>
      </div>
    </footer>
  );
}
