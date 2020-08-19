import React, { useState, useEffect } from 'react';

import useGetVoices from '../../hooks/useGetVoices';
import speak from '../../utils/speak';
import pause from '../../utils/pause';

import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import Commands from '../../components/Commands';
import Settings from '../../components/Settings';
import ShowPages from '../../components/ShowPages';

import './styles.css';

export default function Home() {
  const [texts, setTexts] = useState(['']);
  const [textsQuantity, setTextsQuantity] = useState(['text0']);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const voices = useGetVoices();
  const [voice, setVoice] = useState('');
  const [speed, setSpeed] = useState(1);
  const [speakAction, setSpeakAction] = useState('Falar');

  const [page, setPage] = useState('Meet');

  useEffect(() => {
    if (localStorage.length < 2) {
      return;
    }

    const storageTexts = localStorage
      .getItem('texts')
      .split(',')
      .filter((item, index) => localStorage.getItem(item) !== null);

    setTextsQuantity(storageTexts);
    setTexts(storageTexts.map((item) => localStorage.getItem(item)));
  }, []);

  useEffect(() => {
    localStorage.setItem('texts', textsQuantity);
  }, [textsQuantity]);

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

  function handleSpeak() {
    speak(voices, voice, speed, texts[activeTextIndex], setSpeakAction);
  }

  function handlePause() {
    pause(setSpeakAction);
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

  return (
    <Layout page={page} onPageChange={setPage}>
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
            voices={voices}
            voice={voice}
            setVoice={setVoice}
            speakAction={speakAction}
            onSpeak={handleSpeak}
            onPause={handlePause}
          />
        </div>
        <div className="bg-shape-left" />
      </div>

      <ShowPages page={page} onPageChange={setPage} />
    </Layout>
  );
}
