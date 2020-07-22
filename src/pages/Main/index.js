import React, { useState, useEffect } from 'react';
import useGetVoices from '../../hooks/useGetVoices';

import './styles.css';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Commands from '../../components/Commands';
import Settings from '../../components/Settings';
import ShowPages from '../../components/ShowPages';

export default function Main() {
  const [texts, setTexts] = useState(['']);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [textsQuantity, setTextsQuantity] = useState(['text0']);

  useEffect(() => {
    if (localStorage.length < 2 || !localStorage.length) {
      return;
    }

    const replaceTexts = localStorage.getItem('texts').split(',');

    setTextsQuantity(replaceTexts);
    setTexts(replaceTexts.map((item) => localStorage.getItem(item)));
  }, []);

  useEffect(() => {
    localStorage.setItem('texts', textsQuantity);
  }, [textsQuantity]);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!deleting) {
      return;
    }

    texts.forEach((item, index) => {
      localStorage.removeItem(`text${index + 1}`);
      localStorage.setItem(`text${index}`, `${item}`);
    });

    setDeleting(false);
  }, [deleting, texts]);

  const voices = useGetVoices();
  const [speed, setSpeed] = useState(1);
  const [voice, setVoice] = useState('');
  const [speakAction, setSpeakAction] = useState('Falar');

  function handleSpeak() {
    let myTimeout;

    function myTimer() {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
      myTimeout = setTimeout(myTimer, 10000);
    }

    myTimeout = setTimeout(myTimer, 10000);

    const utt = new SpeechSynthesisUtterance(texts[activeTextIndex]);
    utt.volume = 1;
    utt.rate = speed;
    utt.lang = 'pt-BR';
    if (voice !== '') {
      utt.voice = voices.filter((item) => item.name === voice)[0];
    }

    utt.onend = () => {
      clearTimeout(myTimeout);
      window.speechSynthesis.cancel();
      setSpeakAction('Falar');
    };

    utt.onpause = () => {
      clearTimeout(myTimeout);
    };

    utt.onresume = () => {
      myTimeout = setTimeout(myTimer, 10000);
    };

    window.speechSynthesis.speak(utt);
    setSpeakAction('Pausar');
  }

  function handlePause() {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      return setSpeakAction('Pausar');
    }
    window.speechSynthesis.pause();
    return setSpeakAction('Retomar');
  }

  function handleSaveText(e) {
    const newTexts = texts.map((item, index) => {
      if (index === activeTextIndex) {
        localStorage.setItem(`text${index}`, e.target.value);
        return e.target.value;
      }

      return item;
    });

    setTexts(newTexts);
  }

  function handleDeleteText(i) {
    if (i < activeTextIndex) {
      setActiveTextIndex(activeTextIndex - 1);
    }

    localStorage.removeItem(`text${i}`);

    setTextsQuantity(
      textsQuantity.filter((_, index) => index !== textsQuantity.length - 1)
    );

    setTexts(texts.filter((_, index) => index !== i));

    if (i < textsQuantity.length - 1) {
      setDeleting(true);
    }
  }

  function handleAddText() {
    if (texts.length >= 5) return;

    setTextsQuantity([...textsQuantity, `text${textsQuantity.length}`]);

    setTexts([...texts, '']);
  }

  const [page, setPage] = useState('Meet');

  return (
    <div className="main-container">
      <Header page={page} onPageChange={setPage} />
      <div className="content">
        <Sidebar
          onTextAdd={handleAddText}
          onTextDelete={handleDeleteText}
          onChangeActiveText={setActiveTextIndex}
          texts={texts}
          activeText={activeTextIndex}
        />
        <div className="content-right">
          <h1 className="slogan">
            O <span className="ditey">ditey</span> dita qualquer coisa
            <span className="y-dot">.</span>
            <span className="r-dot">.</span>
            <span className="g-dot">.</span>
          </h1>

          <section className="main">
            <textarea
              onChange={(e) => handleSaveText(e)}
              value={texts[activeTextIndex]}
              className="text-input"
              placeholder="Insira seu texto aqui..."
            />

            <Commands onSpeak={handleSpeak} onPause={handlePause} />
          </section>

          <Settings
            speed={speed}
            setSpeed={setSpeed}
            voice={voice}
            setVoice={setVoice}
            voices={voices}
            speakAction={speakAction}
            onSpeak={handleSpeak}
            onPause={handlePause}
          />
        </div>
        <div className="bg-shape-left" />
      </div>

      <ShowPages page={page} onPageChange={setPage} />

      <Footer page={page} onPageChange={setPage} />
    </div>
  );
}
