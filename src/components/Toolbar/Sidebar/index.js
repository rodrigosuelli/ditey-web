import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';

import miniLogoImg from '../../../assets/svg/ditey-minilogo.svg';

import './styles.css';

export default function Sidebar({ menu, setMenu, onMenuToggle }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { name, email } = userInfo;
  const nameInitial = name[0].toUpperCase();

  let className = 'toolbar';
  if (menu === true) className += ' visible';

  return (
    <aside className={className}>
      <div className="profile">
        <div className="profile-img">{nameInitial}</div>
        <div className="profile-button">
          <div className="profile-info">
            <h4>{name}</h4>
            <p>{email}</p>
          </div>

          <MdArrowDropDown size={24} />
        </div>
      </div>
      <div className="texts-list">
        <Link to="/">Home</Link>
        <Link to="/register">Cadastro</Link>
        <Link to="/login">Log in</Link>
        <Link to="/team">Quem somos</Link>
      </div>
    </aside>
  );
}
