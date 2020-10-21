import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

import logoImg from '../../images/svg/ditey-logo.svg';

import './styles.css';

export default function Header() {
  const [menu, setMenu] = useState(false);

  function handleToggleMenu() {
    setMenu(!menu);
  }

  let sidebarShadowClass = 'sidebar-shadow';
  if (menu === true) sidebarShadowClass += ' visible';

  return (
    <header id="header" className="menu-container">
      <nav className="links">
        <div onClick={handleToggleMenu} className="hamburger-btn">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <Link className="logo" to="/">
          <img src={logoImg} alt="logo" />
        </Link>
        <div className="right-links">
          <Link to="/team">Nosso time</Link>
          <Link to="/register">Cadastro</Link>
          <Link to="/login">Log in</Link>
        </div>
      </nav>

      <div onClick={handleToggleMenu} className={sidebarShadowClass} />
      <Sidebar onMenuToggle={handleToggleMenu} menu={menu} setMenu={setMenu} />
    </header>
  );
}
