import React from 'react';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

import miniLogoImg from '../../../images/svg/ditey-minilogo.svg';

import './styles.css';

export default function Sidebar({ menu, setMenu, onMenuToggle }) {
  let className = '';
  if (menu === true) className = 'visible';

  return (
    <aside className={className}>
      <div className="brand">
        <Link to="/">
          <img src={miniLogoImg} alt="miniLogo" />
        </Link>
        <button onClick={onMenuToggle} className="close-btn" type="button">
          <MdClose color="#fff" size={28} />
        </button>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/register">Cadastro</Link>
        <Link to="/login">Log in</Link>
        <Link to="/team">Quem somos</Link>
      </div>
    </aside>
  );
}
