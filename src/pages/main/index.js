import React from 'react';
import { FaMicrophoneAlt, FaCheck } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

export default function Main() {
    return(
        <div className="main-container">
            <Header />
            <section className="content">
                <Sidebar />

                <div className="content-right">
                    <h1 className="slogan">
                        O <span className="ditey">ditey</span> dita qualquer coisa
                        <span className="y-dot">.</span>
                        <span className="r-dot">.</span>
                        <span className="g-dot">.</span>
                    </h1>

                    <section className="main">
                        <textarea className="text-input" placeholder="Insira seu texto aqui..."></textarea>


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

                    <div className="settings">
                        <label htmlFor="speed">Speed:</label>
                        <input type="range" name="speed"/>
                    </div>

                </div>
            </section>
        </div>
        );
    }

