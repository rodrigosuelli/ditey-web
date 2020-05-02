import React, { useState } from 'react';
import { FaPlay, FaPause, FaStop, FaMicrophoneAlt, FaCheck } from 'react-icons/fa';
import './styles.css';

import useEvent from '../../hooks/useEvent';

export default function Commands(props) {
  const [micStatus, setMicStatus] = useState('Clique no ícone ou pressione /');
  const [command, setCommand] = useState('iniciar');

  function readMessage(message) {
    if (message.includes('iniciar')) {
      if (speechSynthesis.speaking === true) return alert('Ops! Já tem um texto sendo lido!');
      props.onSpeak();
    }

    if (message.includes('pausar')) {
      if (speechSynthesis.speaking === true && speechSynthesis.paused === true)
        return alert('Ops! A leitura já está pausada!');

      if (speechSynthesis.speaking === false) return alert('Ops! Não há nada para ser pausado!');
      props.onPause();
    }

    if (message.includes('retomar')) {
      if (speechSynthesis.speaking === true && speechSynthesis.paused === false)
        return alert('Ops! A leitura não está pausada!');

      if (speechSynthesis.speaking === false) return alert('Ops! Não há nada para ser retomado!');
      props.onPause();
    }

    if (message.includes('parar')) {
      if (speechSynthesis.speaking === false) return alert('Ops! Não há o que parar!');
      window.speechSynthesis.cancel();
    }

    return false;
  }

  function handleHear() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'pt-BR';

    recognition.onstart = () => {
      setMicStatus('Estou ouvindo...');
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;

      setMicStatus('Clique no ícone ou pressione /');
      setCommand(transcript);
      readMessage(transcript);
    };

    recognition.onend = () => {
      setMicStatus('Clique no ícone ou pressione /');
    };

    recognition.start();
  }

  useEvent('keydown', (event) => {
    if (event.code === 'IntlRo') {
      handleHear();
    }
  });

  let micClassName = 'mic';
  if (micStatus === 'Estou ouvindo...') micClassName += ' on';
  return (
    <div className="commands-container">
      <div className="mic-container">
        <button type="button" onClick={handleHear} className={micClassName}>
          <FaMicrophoneAlt size={64} color="#FF0000" />
        </button>
        <p className="commands-title">{micStatus}</p>
      </div>
      <div className="spoken-command-container">
        <p className="mini-title">você disse:</p>
        <p className="command">{command}</p>
      </div>
      <div className="command-list">
        <p className="table-title">Comandos:</p>
        <div className="table-items">
          <p className="table-item">
            <FaPlay className="action-icon" color="#757575" />
            iniciar
          </p>
          <p className="table-item">
            <FaPause className="action-icon" color="#757575" />
            pausar
          </p>
          <p className="table-item">
            <FaCheck className="action-icon" color="#757575" />
            retomar
          </p>
          <p className="table-item">
            <FaStop className="action-icon" color="#757575" />
            parar
          </p>
        </div>
      </div>
    </div>
  );
}
