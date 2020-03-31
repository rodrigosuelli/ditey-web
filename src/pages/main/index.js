import React from 'react';

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
                        <textarea placeholder="Insira seu texto aqui..."></textarea>

                        <div className="commands">
                            <p>Hi!</p>        
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

