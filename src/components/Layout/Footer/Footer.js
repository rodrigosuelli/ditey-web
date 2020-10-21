import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'react-router-dom';

import { FaGithub } from 'react-icons/fa';
import { MdArrowDropDownCircle } from 'react-icons/md';

import logoImg from '../../../images/svg/ditey-logo.svg';

import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logoImg} alt="logo" />
          </Link>
          <p className="copyright">Copyright © Ditey 2020</p>
        </div>
        <div className="links">
          <AnchorLink href="#header">
            <div className="link-container">
              <MdArrowDropDownCircle className="up-icon" size={22} />
              Ir para o topo
            </div>
          </AnchorLink>
          <a
            href="https://github.com/rodrigosuelli/ditey-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="link-container">
              <FaGithub size={22} />
              GitHub
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
