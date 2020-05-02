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
  const [firstLoad, setFirstLoad] = useState(true);

  const [texts, setTexts] = useState(['']);
  const [storageTexts, setStorageTexts] = useState('text0');
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  const [speed, setSpeed] = useState(1);
  const voices = useGetVoices();
  const [voice, setVoice] = useState('');
  const [speakAction, setSpeakAction] = useState('Falar');

  const [page, setPage] = useState('Meet');

  useEffect(() => {
    if (firstLoad === false) return;

    if (localStorage.getItem('texts') === null) {
      localStorage.setItem('texts', storageTexts);
      return;
    }

    const getTexts = localStorage.getItem('texts');
    setStorageTexts(getTexts);

    const replaceTexts = getTexts.split(',');
    setTexts(
      replaceTexts.map((item) => {
        return localStorage.getItem(item);
      })
    );

    setFirstLoad(false);
  }, [firstLoad, storageTexts]);

  useEffect(() => {
    localStorage.clear();
    const newStorageTexts = texts.map((item, index) => {
      localStorage.setItem(`text${index}`, `${item}`);
      return `text${index}`;
    });

    localStorage.setItem('texts', newStorageTexts);

    setStorageTexts(newStorageTexts.join(','));
  }, [storageTexts, texts]);

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

  function handleChangeActiveText(i) {
    setActiveTextIndex(i);
  }

  function handleSaveText(e) {
    setTexts(
      texts.map((item, index) => {
        if (index === activeTextIndex) {
          return e.target.value;
        }
        return item;
      })
    );
  }

  function handleDeleteText(i) {
    if (activeTextIndex === i) return;
    if (i < activeTextIndex) setActiveTextIndex(activeTextIndex - 1);

    localStorage.removeItem(`text${i}`);

    setTexts(
      texts.filter((_item, index) => {
        return index !== i;
      })
    );
  }

  function handleAddText() {
    if (texts.length >= 5) return;
    setTexts(texts.concat(''));
  }

  return (
    <div className="main-container">
      <Header page={page} onPageChange={setPage} />
      <div className="content">
        <Sidebar
          onTextAdd={handleAddText}
          onTextDelete={handleDeleteText}
          onChangeActiveText={handleChangeActiveText}
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
      </div>

      <ShowPages page={page} onPageChange={setPage} />

      <Footer page={page} onPageChange={setPage} />
    </div>
  );
}
