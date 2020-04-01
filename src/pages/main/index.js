import React, { useState, useEffect } from 'react';
import { FaPlay, FaMicrophoneAlt, FaCheck } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

export default function Main() {
    const [speed, setSpeed] = useState(1);
    const [text, setText] = useState('');

    useEffect(() => {
        if (localStorage.getItem('text1') === null || undefined){
            return;
        }
            setText(localStorage.getItem('text1'));
    }, []);


    async function handleSaveText(e) {
        setText(e.target.value);
        localStorage.setItem('text1', e.target.value);
    }

    return(
        <div className="main-container">
            <Header />
            <div className="content">
                <Sidebar text={text} />
                <div className="content-right">
                    <h1 className="slogan">
                        O <span className="ditey">ditey</span> dita qualquer coisa
                        <span className="y-dot">.</span>
                        <span className="r-dot">.</span>
                        <span className="g-dot">.</span>
                    </h1>

                    <section className="main">
                        <textarea onChange={e => handleSaveText(e)}
                        value={text}
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

