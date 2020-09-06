import React from 'react';
import { FaStop, FaPlay, FaPause } from 'react-icons/fa';

import './styles.css';

export default function Settings(props) {
  const {
    speakAction,
    voices,
    voice,
    setVoice,
    speed,
    setSpeed,
    onSpeak,
    onPause,
  } = props;

  function SpeakIcon() {
    if (speakAction === 'Pausar') {
      return <FaPause className="icon" size={21} color="#fff" />;
    }

    return <FaPlay className="icon" size={21} color="#fff" />;
  }

  return (
    <section className="settings">
      <div className="ajusts">
        <div className="speed-container">
          <label htmlFor="speed" className="speed-label">
            <p>Velocidade: {speed}</p>
          </label>
          <input
            onChange={(e) => setSpeed(e.target.value)}
            value={speed}
            min="0.1"
            max={voice === 'Google português do Brasil' ? 2 : 5}
            type="range"
            step="0.1"
            className="range"
            name="speed"
            id="speed"
          />
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
        <button
          type="button"
          onClick={speakAction === 'Falar' ? onSpeak : onPause}
          className="speak"
        >
          <SpeakIcon />
          {speakAction}
        </button>

        <button
          type="button"
          onClick={() => speechSynthesis.cancel()}
          className="speak"
        >
          <FaStop size={21} color="#fff" />
        </button>
      </div>
    </section>
  );
}
