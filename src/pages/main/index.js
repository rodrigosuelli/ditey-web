import React, { useState, useEffect } from 'react';
import { FaPlay, FaMicrophoneAlt, FaCheck } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

export default function Main() {
    const [speed, setSpeed] = useState(1);
    const [texts, setTexts] = useState(['']);
    const [activeTextIndex, setActiveTextIndex] = useState(0);

    useEffect(() => {

        if (localStorage.getItem(`text${activeTextIndex}`) === null || undefined){
            return;
        }

        if (texts[activeTextIndex] === localStorage.getItem(`text${activeTextIndex}`)) {
            return;
        }

        setTexts(texts.map((item, index) => {
        if (index === activeTextIndex) {
            return localStorage.getItem(`text${activeTextIndex}`);
        }   
        return item;        
        }));
    }, [texts, activeTextIndex]);


    function handleSaveText(e) {
        setTexts(texts.map((item, index) => {
            if (index === activeTextIndex) {
                return e.target.value;
            }

            return item;
        }));

        localStorage.setItem(`text${activeTextIndex}`, e.target.value);
    }

    function handleDeleteText(i) {
        if (activeTextIndex === i) {
            return;
        }

        setTexts(texts.filter((item, index) => {
            return index !== i;
        }))
    }

    function handleAddText() {
        if (texts.length >= 4) {
            return;
        }

        setTexts(texts.concat(''));
    }

    return(
        <div className="main-container">
            <Header />
            <div className="content">
                <Sidebar 
                onTextAdd={handleAddText} 
                onTextDelete={handleDeleteText}
                texts={texts} 
                text={texts[activeTextIndex]} 
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
                        <button className="speak"><FaPlay className="play-icon" size={21} color="#fff"/> Falar</button>
                    </section>

                </div>
            </div>
        </div>
        );
    }

