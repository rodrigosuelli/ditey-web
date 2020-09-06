import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import { Link } from 'react-router-dom';

import './styles.css';

export default function Header(props) {
  return (
    <header id="header" className="menu-container">
      <div className="logo-container">
        <Link className="logo" to="/">
          <span className="logo-brand">ditey</span>
        </Link>
      </div>

      <nav>
        <ul className="nav-links">
          <li className="nav-item">
            <AnchorLink
              className="nav-link"
              offset={() => -44}
              onClick={() => props.onPageChange('Meet')}
              href="#pages"
            >
              Conheça
            </AnchorLink>
          </li>
          <li className="nav-item">
            <AnchorLink
              className="nav-link"
              offset={() => -44}
              onClick={() => props.onPageChange('Team')}
              href="#pages"
            >
              Quem Somos
            </AnchorLink>
          </li>
          <li className="nav-item">
            <AnchorLink
              className="nav-link"
              offset={() => -44}
              onClick={() => props.onPageChange('App')}
              href="#pages"
            >
              Nosso App
            </AnchorLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
