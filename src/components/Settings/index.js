import React from 'react';
import { FaStop, FaPlay, FaPause } from 'react-icons/fa';

import './styles.css';

export default function Settings(props) {
  const { speakAction, voices, voice, setVoice, speed, setSpeed, onSpeak, onPause } = props;

  function SpeakIcon() {
    if (speakAction === 'Pausar') {
      return <FaPause className="play-icon" size={21} color="#fff" />;
    }
    return <FaPlay className="play-icon" size={21} color="#fff" />;
  }

  function RangeInput() {
    if (voice === 'Google português do Brasil') {
      return (
        <input
          onChange={(e) => setSpeed(e.target.value)}
          value={speed}
          min="0.1"
          max="2"
          type="range"
          step="0.1"
          className="range"
          name="speed"
          id="speed"
        />
      );
    }
    return (
      <input
        onChange={(e) => setSpeed(e.target.value)}
        value={speed}
        min="0.1"
        max="5"
        type="range"
        step="0.1"
        className="range"
        name="speed"
        id="speed"
      />
    );
  }

  return (
    <section className="settings">
      <div className="ajusts">
        <div className="speed-container">
          <label htmlFor="speed" className="speed-label">
            <p>Velocidade: {speed}</p>
          </label>
          {RangeInput()}
        </div>

        <div className="voice-container">
          <label htmlFor="voice">
            <p className="speed-label">Voz:</p>
          </label>

          <select
            onChange={(e) => {
              setVoice(e.target.value);
              setSpeed(1);
            }}
            className="select-css"
            name="voice"
            id="voice"
          >
            {voices.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="actions">
        <button type="button" onClick={speakAction === 'Pausar' ? onPause : onSpeak} className="speak">
          <SpeakIcon speakAction={speakAction} />
          {speakAction}
        </button>

        <button type="button" onClick={() => window.speechSynthesis.cancel()} className="speak">
          <FaStop size={21} color="#fff" />
        </button>
      </div>
    </section>
  );
}
