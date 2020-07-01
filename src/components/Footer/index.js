import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FaGithub } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import './styles.css';

export default function Footer(props) {
  return (
    <footer>
      <div className="footer-container">
        <div className="list-container">
          <h3 className="list-title">Links</h3>
          <div>
            <AnchorLink
              offset={() => -44}
              onClick={() => props.onPageChange('Meet')}
              href="#pages"
            >
              Conheça
            </AnchorLink>

            <AnchorLink
              offset={() => -44}
              onClick={() => props.onPageChange('Team')}
              href="#pages"
            >
              Quem Somos
            </AnchorLink>

            <AnchorLink
              offset={() => -44}
              onClick={() => props.onPageChange('App')}
              href="#pages"
            >
              Nosso App
            </AnchorLink>
          </div>
        </div>
        <div className="list-container">
          <h3 className="list-title">Nosso Time</h3>
          <div>
            <Link to="/">Rodrigo</Link>
            <Link to="/">Eusébio</Link>
            <Link to="/">Lucas Tadeu</Link>
            <Link to="/">Gabriel Santim</Link>
            <Link to="/">José Murilo</Link>
          </div>
        </div>
        <div className="list-container logo">
          <AnchorLink href="#header" className="footer-logo">
            ditey
          </AnchorLink>
          <p className="copyright">Copyright &copy; Ditey 2020</p>
          <a
            className="align-center"
            href="https://github.com/rodrigosuelli/ditey"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub color="#fff" size={40} />
          </a>
        </div>
      </div>
    </footer>
  );
}
