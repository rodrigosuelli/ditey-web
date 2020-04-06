import React, { useState, useEffect } from 'react';
import { FaPlay, FaMicrophoneAlt, FaCheck } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

export default function Main() {
    const [texts, setTexts] = useState(['']);
    const [activeTextIndex, setActiveTextIndex] = useState(0);

    const [storageTexts, setStorageTexts] = useState('text0');
    
    const [speed, setSpeed] = useState(1);
 
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

    function handleShowTexts(){
        console.log(texts, storageTexts);
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
                            <button className="mic">
                            <FaMicrophoneAlt size={64} color="#FF0000"/>    
                            </button>
                            <p className="commands-title">Clique no ícone ou pressione space...</p>  
                            <p style={{color: '#2c2c2c'}}>você disse:</p>
                            <p className="command">ditey iniciar</p>
                            <p className="table-title">Comandos:</p>
                            <div className="command-list">
                                <p className="table-item"><FaCheck color="#757575"/> ditey iniciar</p>    
                                <p className="table-item"><FaCheck color="#757575"/> ditey status</p>    
                                <p className="table-item"><FaCheck color="#757575"/> ditey pausar</p>    
                                <p className="table-item"><FaCheck color="#757575"/> ditey parar</p>    
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
                            min="1" max="10" 
                            type="range"
                            className="range" 
                            name="speed" 
                            id="speed"/>
                        </div>
                        <button onClick={handleShowTexts} className="speak"><FaPlay className="play-icon" size={21} color="#fff"/> Falar</button>
                    </section>

                </div>
            </div>
        </div>
        );
    }