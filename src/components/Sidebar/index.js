import React from 'react';

import miniLogoImg from '../../assets/svg/ditey-minilogo.svg';

import './styles.css';

export default function Sidebar({ className }) {
  return (
    <aside className={className}>
      <img src={miniLogoImg} alt="miniLogo" />
    </aside>
  );
}
