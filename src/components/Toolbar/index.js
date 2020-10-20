import React, { useState } from 'react';
import { MdPlayArrow, MdStop, MdMic, MdSettings } from 'react-icons/md';

import './styles.css';

export default function Toolbar({ handleToggleMenu }) {
  const [speed, setSpeed] = useState(1);

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
        <div className="speed-container">
          <label htmlFor="speed">Velocidade: {speed}</label>
          <input
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            min="0.1"
            max="5"
            step="0.1"
            type="range"
            name="speed"
          />
        </div>
        <div className="right-buttons">
          <div className="mic-container">
            <button className="mic" type="button">
              <MdMic size={18} />
            </button>
            <span>
              Click no ícone ou
              <br />
              pressione / para falar
            </span>
          </div>
          <button className="settings" type="button">
            <MdSettings size={24} />
          </button>
        </div>
      </nav>
    </header>
  );
}
