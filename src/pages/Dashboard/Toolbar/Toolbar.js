import React, { useEffect, useState } from 'react';
import {
  MdPlayArrow,
  MdPause,
  MdStop,
  MdMic,
  MdSettings,
} from 'react-icons/md';
import useGetVoices from '../../../hooks/useGetVoices';

import './Toolbar.css';

export default function Toolbar({ handleToggleMenu, activeText }) {
  const voices = useGetVoices();

  const [speed, setSpeed] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState('');

  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!speechSynthesis.speaking) {
      return;
    }

    const interval = setInterval(() => {
      speechSynthesis.resume();
      if (!speaking) {
        speechSynthesis.pause();
      }
    }, 14000);

    return () => {
      clearInterval(interval);
    };
  }, [speaking]);

  function handleSpeak() {
    speechSynthesis.cancel();

    const utt = new SpeechSynthesisUtterance(activeText.content);
    utt.volume = 1;
    utt.rate = speed;
    utt.lang = 'pt-BR';
    if (selectedVoice !== '') {
      utt.voice = voices.filter((voice) => voice.name === selectedVoice)[0];
    }

    speechSynthesis.speak(utt);

    utt.onstart = () => {
      setSpeaking(true);
    };

    utt.onend = () => {
      speechSynthesis.cancel();
      setSpeaking(false);
    };
  }

  function handlePause() {
    if (
      (!speaking && selectedVoice === 'Google português do Brasil') ||
      speechSynthesis.paused
    ) {
      speechSynthesis.resume();
      setSpeaking(true);
    } else {
      speechSynthesis.pause();
      setSpeaking(false);
    }
  }

  function handleStopSpeech() {
    speechSynthesis.cancel();
    setSpeaking(false);
  }

  return (
    <header className="toolbar">
      <nav>
        <div onClick={handleToggleMenu} className="hamburger-btn">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <div className="center-buttons">
          <button
            onClick={() => {
              if (speechSynthesis.speaking || speechSynthesis.paused) {
                handlePause();
              } else {
                handleSpeak();
              }
            }}
            className="speak"
            type="button"
          >
            {speaking ? <MdPause size={30} /> : <MdPlayArrow size={30} />}
          </button>
          <button onClick={handleStopSpeech} className="stop" type="button">
            <MdStop size={30} />
          </button>
        </div>
        <select
          onChange={(e) => {
            setSelectedVoice(e.target.value);
            setSpeed(1);
          }}
          className="voice"
          name="voice"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
        <div className="speed-container">
          <label htmlFor="speed">Velocidade: {speed}</label>
          <input
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            min="0.1"
            max={selectedVoice === 'Google português do Brasil' ? 2 : 5}
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
