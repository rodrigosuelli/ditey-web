import React, { useState, useEffect } from 'react';
import { FaPlay, FaMicrophoneAlt, FaCheck } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

export default function Main() {
    const [speed, setSpeed] = useState(1);
    const [texts, setTexts] = useState(['']);
    const [activeTextIndex, setActiveTextIndex] = useState(0);
    const [storageTexts, setStorageTexts] = useState('text0');
    const [added, setAdded] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [changeActiveText, setChangeActiveText] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('texts') === null || undefined)
            return localStorage.setItem('texts', storageTexts);

        if (added === true) {
            setStorageTexts(`${storageTexts},text${texts.length - 1}`);

            setAdded(false);
        }

        if (deleted === true) {
            if (changeActiveText === true){
                setActiveTextIndex(activeTextIndex - 1);
                setChangeActiveText(false);
            }

            const newStorageTexts = texts.map((item, index) => {
                return `text${index}`;
            });

            setStorageTexts(newStorageTexts.join(','));
            setDeleted(false);
        }
        
        localStorage.setItem('texts', storageTexts);
        // if (Added === false)
        //     return setStorageTexts(localStorage.getItem('texts'));

        // if (Deleted === true) {
        //     setStorageTexts('text0');
        //     console.log(storageTexts);
        //     return localStorage.setItem('texts', storageTexts);
        // }
        // if (Deleted === true) {
            
        //         updateStorageTexts();
            
        //     console.log(storageTexts);
        //     return setDeleted(false);
        // }

        // if (Deleted === true) {
        // console.log(storageTexts);

        //         return setStorageTexts(`${storageTexts},text${texts.lenght - 1}`);
        // }
        // console.log(storageTexts);


        // localStorage.setItem('texts', `${storageTexts}`);

        //------------------------------------------------------------------------------------------

        // setStorageTexts(`${storageTexts},text${texts.lenght - 1}`);
        // return localStorage.setItem('texts', storageTexts);
        // const newTexts = texts.map((item, index) => {
        // if (localStorage.getItem(`text${index}`) === null || undefined) {
        //     return item;
        // }
        
        // if (texts[index] === localStorage.getItem(`text${index}`)) {
        //     return item;
        // }

        // if (index === texts.indexOf(item)) {
        //     return localStorage.getItem(`text${index}`);
        // }

        // return item;
        // });
        
    }, [texts, added, storageTexts, deleted, activeTextIndex, changeActiveText]);

    function handleShowTexts(){
        console.log(texts, storageTexts);
        console.log(activeTextIndex);
    }

    function handleChangeActiveText(i) {
        setActiveTextIndex(i);
    }

    function handleSaveText(e) {
        setTexts(texts.map((item, index) => {
            if (index === activeTextIndex) {
                localStorage.setItem(`text${activeTextIndex}`, e.target.value);
                return e.target.value;
            }
            return item;
        }));
    }

    function handleDeleteText(i) {
        if (activeTextIndex === i) return;

        if (i < activeTextIndex)
        setChangeActiveText(true)

        localStorage.removeItem(`text${i}`);

        setTexts(texts.filter((item, index) => {
            return index !== i;
        }));

        setDeleted(true);
    }

    function handleAddText() {;
        if (texts.length >= 5) return;
        
        setTexts(texts.concat(''));
        setAdded(true);
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

    /*
    ["A", "b", "c", "d"]
    *0* 1 2

    ["B", "c"]
    *0* 1
    */