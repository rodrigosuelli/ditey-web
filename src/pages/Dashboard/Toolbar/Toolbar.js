import React, { useEffect, useState } from 'react';
import {
  MdPlayArrow,
  MdPause,
  MdStop,
  MdMic,
  MdSettings,
  MdClose,
} from 'react-icons/md';
import { FaTachometerAlt } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import useGetVoices from '../../../hooks/useGetVoices';
import useEvent from '../../../hooks/useEvent';

import './Toolbar.css';

export default function Toolbar({ handleToggleMenu, activeText }) {
  const voices = useGetVoices();

  const [speed, setSpeed] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState('');

  const [speaking, setSpeaking] = useState(false);
  const [micStatus, setMicStatus] = useState(
    'Click no ícone ou pressione Ctrl para falar'
  );
  const [micModalShow, setMicModalShow] = useState(false);
  const [settingsShow, setSettingsShow] = useState(false);
  const [speedContainerShow, setSpeedContainerShow] = useState(false);

  const alreadyVisited = localStorage.getItem('alreadyVisited');
  let parsedAlreadyVisited;
  if (alreadyVisited === 'true' || alreadyVisited === 'false') {
    parsedAlreadyVisited = JSON.parse(alreadyVisited);
  }

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
    if (isMobile) {
      return;
    }

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

  function handleRunVoiceCommand(message) {
    if (message.includes('iniciar')) {
      handleSpeak();
      return;
    }
    if (message.includes('pausar') || message.includes('retomar')) {
      handlePause();
      return;
    }
    if (message.includes('parar')) {
      handleStopSpeech();
      return;
    }

    setMicStatus('Não entendi, tente novamente...');
  }

  function handleHearVoiceCommand() {
    if (navigator.userAgent.includes('Edg')) {
      return alert(
        'Ooops! Infelizmente seu browser não suporta esta função, use o Chrome!'
      );
    }

    const SpeechRecog =
      window.SpeechRecognition || window.webkitSpeechRecognition || false;
    const recognition = new SpeechRecog();

    recognition.lang = 'pt-BR';

    recognition.onstart = () => {
      setMicStatus('Estou ouvindo...');
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;

      setMicStatus('Click no ícone ou pressione Ctrl para falar');
      handleRunVoiceCommand(transcript);
    };

    recognition.onerror = () => {
      setMicStatus('Não entendi, tente novamente...');
    };

    recognition.start();
  }

  function handleMicClick() {
    if (!parsedAlreadyVisited) {
      setMicModalShow(true);

      localStorage.setItem('alreadyVisited', true);
    } else {
      handleHearVoiceCommand();
    }
  }

  function handleMicModalClick(event) {
    if (event.target.className.toString().includes('mic-modal')) {
      setMicModalShow(false);
    }
  }

  useEvent('keydown', (event) => {
    if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
      handleHearVoiceCommand();
    }
  });

  function handleSettingsOverlayClick(event) {
    if (event.target.className.toString() === 'settings-overlay') {
      setSettingsShow(false);
    }
  }

  function handleChangeSpeedClick() {
    setSettingsShow(false);
    setSpeedContainerShow(true);
  }

  function handleSpeedContainerOverlayClick(event) {
    if (event.target.className.toString() === 'speed-container-overlay') {
      setSpeedContainerShow(false);
    }
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
            <button onClick={handleMicClick} className="mic" type="button">
              <MdMic size={18} />
            </button>
            <span>{micStatus}</span>
          </div>
          <button
            onClick={() => setSettingsShow(true)}
            className="settings"
            type="button"
          >
            <MdSettings size={24} />
          </button>
        </div>
      </nav>

      {settingsShow && (
        <div onClick={handleSettingsOverlayClick} className="settings-overlay">
          <div className="settings-menu">
            <button onClick={handleChangeSpeedClick} type="button">
              <FaTachometerAlt size={22} />
              Mudar Velocidade
            </button>
          </div>
        </div>
      )}
      {speedContainerShow && (
        <div
          onClick={handleSpeedContainerOverlayClick}
          className="speed-container-overlay"
        >
          <div className="mobile-speed-container">
            <h1>Ajustar velocidade</h1>
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
        </div>
      )}

      <div
        onClick={handleMicModalClick}
        className={micModalShow ? 'mic-modal visible' : 'mic-modal'}
      >
        <div className="modal-content">
          <MdClose
            onClick={() => setMicModalShow(false)}
            color="#fff"
            size={28}
          />
          <h1>Comandos de voz</h1>
          <p>Economize clicks usando os comandos de voz:</p>
          <ul className="commands-list">
            <li>Iniciar</li>
            <li>Pausar</li>
            <li>Retomar</li>
            <li>Parar</li>
          </ul>
          <p className="warning">Essa janela não será exibida novamente</p>
        </div>
      </div>
    </header>
  );
}
