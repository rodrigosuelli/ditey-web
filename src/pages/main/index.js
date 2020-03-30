import React, { useState } from 'react';

import './styles.css';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

export default function Main() {
    const [menuOpen, SetmenuOpen] = useState(false);

    function handleMenu () {
        if (menuOpen === false){
            return SetmenuOpen(true);
        }
        
        SetmenuOpen(false);
    }
        return(
            <div id="main-container" className="main-container">
                <Header click={handleMenu} />
                <Sidebar isOpen={menuOpen} />
                <section id="content" className="content">
                    <h1 className="slogan">
                        O <span className="ditey">ditey</span> dita qualquer coisa
                        <span className="y-dot">.</span>
                        <span className="r-dot">.</span>
                        <span className="g-dot">.</span>
                    </h1>

                    <section className="main">
                    <textarea placeholder="Insira seu texto aqui..."></textarea>
                    <div className="commands">
                        
                    </div>
                    <div className="settings">
                    <label htmlFor="speed">Speed:</label>
                    <input type="range" name="speed"/>
                    </div>
                    </section>

                </section>
            </div>
        );
    }

