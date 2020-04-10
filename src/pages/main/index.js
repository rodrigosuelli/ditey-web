import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop, FaMicrophoneAlt, FaCheck } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

export default function Main() {
    const [texts, setTexts] = useState(['']);
    const [storageTexts, setStorageTexts] = useState('text0');
    const [activeTextIndex, setActiveTextIndex] = useState(0);
 
    const [firstLoad, setFirstLoad] = useState(true);
    useEffect(() => {
        if (firstLoad === false) return;

        if (localStorage.getItem('texts') === null)
        return localStorage.setItem('texts', storageTexts);

        const getTexts = localStorage.getItem('texts');
        setStorageTexts(getTexts);

        const replaceTexts = getTexts.split(',');
        setTexts(replaceTexts.map((item, index) => {
            return localStorage.getItem(item);
        }));

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

    const [speed, setSpeed] = useState(1);
    const [speakAction, setSpeakAction] = useState('Falar');
    function handleSpeak() {
        var myTimeout;
            function myTimer() {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
                myTimeout = setTimeout(myTimer, 10000);
            }

            myTimeout = setTimeout(myTimer, 10000);
            var utt = new SpeechSynthesisUtterance(texts[activeTextIndex]);

            utt.volume = 1;
            utt.rate = speed;
            utt.lang = 'pt-BR';
            
            utt.onend = () => {
                clearTimeout(myTimeout);
                window.speechSynthesis.cancel()
                setSpeakAction('Falar');
            };

            utt.onpause = () => {
                clearTimeout(myTimeout);
            }

            utt.onresume = () => {
                myTimeout = setTimeout(myTimer, 10000);
            }
            window.speechSynthesis.speak(utt);
            setSpeakAction('Pausar');
    }

    function handlePause() {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            return setSpeakAction('Pausar');
        }
        window.speechSynthesis.pause();
        setSpeakAction('Retomar');
    } 

    const [micStatus, setMicStatus] = useState('Clique no ícone ou pressione space...');
    const [command, setCommand] = useState('iniciar');
    function handleHear() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            setMicStatus('Estou ouvindo...');
        };

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;

            setMicStatus('Clique no ícone ou pressione space...');
            setCommand(transcript);
            readMessage(transcript);
        };

        recognition.start();
    }

    function readMessage(message) {
        if (message.includes('iniciar')) {
            if (speechSynthesis.speaking === true)
            return alert('Ops! Já tem um texto sendo lido!');
            handleSpeak();
        }
        if (message.includes('pausar')) {
            if (speechSynthesis.speaking === true && speechSynthesis.paused === true)
            return alert('Ops! A leitura já está pausada!');
            handlePause();
        }
        if (message.includes('retomar')) {
            if (speechSynthesis.speaking === true && speechSynthesis.paused === false)
            return alert('Ops! A leitura não está pausada!');
            handlePause();
        }
        if (message.includes('parar')) {
            if (speechSynthesis.speaking === false)
            return alert('Ops! A leitura já está pausada!');
            window.speechSynthesis.cancel();
        }
    }

    function handleChangeActiveText(i) {
        setActiveTextIndex(i);
    }

    function handleSaveText(e) {
        setTexts(texts.map((item, index) => {
            if (index === activeTextIndex) {
                return e.target.value;
            }
            return item;
        }));
    }

    function handleDeleteText(i) {
        if (activeTextIndex === i) return;
        if (i < activeTextIndex) setActiveTextIndex(activeTextIndex - 1);

        localStorage.removeItem(`text${i}`);

        setTexts(texts.filter((item, index) => {
            return index !== i;
        }));
    }

    function handleAddText() {
        if (texts.length >= 5) return;
        setTexts(texts.concat(''));
    }

    return(
        <div className="main-container">
            <Header />
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
                        <textarea onChange={e => handleSaveText(e)}
                        value={texts[activeTextIndex]}
                        className="text-input" 
                        placeholder="Insira seu texto aqui...">
                        </textarea>

                        <div className="commands-container">
                            <button onClick={handleHear} className="mic">
                            <FaMicrophoneAlt size={64} color="#FF0000"/>    
                            </button>
                            <p className="commands-title">{micStatus}</p>  
                            <p style={{color: '#2c2c2c'}}>você disse:</p>
                            <p className="command">{command}</p>
                            <p className="table-title">Comandos:</p>
                            <div className="command-list">
                                <p className="table-item"><FaCheck color="#757575"/> iniciar</p>        
                                <p className="table-item"><FaCheck color="#757575"/> pausar</p> 
                                <p className="table-item"><FaCheck color="#757575"/> retomar</p>    
                                <p className="table-item"><FaCheck color="#757575"/> parar</p>    
                            </div>
                        </div>
                    </section>

                    <section className="settings">
                        <div className="ajusts">
                            <label htmlFor="speed">
                                <p className="speed-label">Velocidade: {speed}</p>
                            </label>

                            <input onChange={e => setSpeed(e.target.value)}
                            value={speed} 
                            min="0.1" max="5" 
                            type="range"
                            step="0.1"
                            className="range" 
                            name="speed" 
                            id="speed"/>
                        </div>

                        <div className="actions">
                            <button 
                            onClick={speakAction === 'Falar' ? handleSpeak : speakAction === 'Pausar' ? handlePause : handlePause} 
                            className="speak">
                            <FaPlay 
                            className="play-icon" 
                            size={21} 
                            color="#fff"
                            /> {speakAction}
                            </button>
                            <button 
                            onClick={() => window.speechSynthesis.cancel()} 
                            className="speak">
                            <FaStop
                            size={21}
                            color="#fff"
                            />
                            </button>
                        </div>
                    </section>

                </div>
            </div>
        </div>
        );
    }