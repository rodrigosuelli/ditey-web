import React, { useState } from 'react';
import { MdPlayArrow, MdStop, MdMic, MdSettings } from 'react-icons/md';
import Sidebar from './Sidebar';

import './styles.css';

export default function Toolbar({
  texts,
  activeText,
  onActiveTextChange,
  onTextsChange,
}) {
  const [menu, setMenu] = useState(false);

  function handleToggleMenu() {
    setMenu(!menu);
  }

  let sidebarShadowClass = 'sidebar-shadow';
  if (menu === true) sidebarShadowClass += ' visible';

  return (
    <header className="toolbar">
      <nav>
        <div onClick={handleToggleMenu} className="hamburger-btn">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <div className="center-buttons">
          <button className="speak" type="button">
            <MdPlayArrow size={30} />
          </button>
          <button className="stop" type="button">
            <MdStop size={30} />
          </button>
        </div>
        <select className="voice" name="voice">
          <option value="Microsoft Maria Desktop - Portuguese(Brazil)">
            Microsoft Maria Desktop - Portuguese(Brazil)
          </option>
          <option value="Google português do Brasil">
            Google português do Brasil
          </option>
        </select>
        <div className="right-buttons">
          <button className="mic" type="button">
            <MdMic size={18} />
          </button>
          <button className="settings" type="button">
            <MdSettings size={24} />
          </button>
        </div>
      </nav>

      <div onClick={handleToggleMenu} className={sidebarShadowClass} />
      <Sidebar
        texts={texts}
        onTextsChange={onTextsChange}
        activeText={activeText}
        onActiveTextChange={onActiveTextChange}
        menu={menu}
        onMenuChange={setMenu}
      />
    </header>
  );
}
