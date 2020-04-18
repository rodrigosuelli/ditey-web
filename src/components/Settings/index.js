import React from 'react';
import { FaStop, FaPlay, FaPause } from 'react-icons/fa';

import './styles.css';

export default function Settings(props) {
    function SpeakIcon() {
        if (props.speakAction === 'Pausar') {
            return <FaPause className="play-icon" size={21} color="#fff" />
        }
        return <FaPlay className="play-icon" size={21} color="#fff" />
    }

    return (
        <section className="settings">
            <div className="ajusts">
                <label htmlFor="speed">
                    <p className="speed-label">Velocidade: {props.speed}</p>
                </label>

                <input onChange={e => props.setSpeed(e.target.value)}
                value={props.speed} 
                min="0.1" max="5" 
                type="range"
                step="0.1"
                className="range" 
                name="speed" 
                id="speed"/>
            </div>

            <div className="actions">
                <button 
                onClick={props.speakAction === 'Falar' ? props.onSpeak : props.speakAction === 'Pausar' ? props.onPause : props.onPause}
                className="speak"
                >
                <SpeakIcon speakAction={props.speakAction} />
                {props.speakAction}
                </button>

                <button 
                onClick={() => window.speechSynthesis.cancel()} 
                className="speak">
                <FaStop size={21} color="#fff" />
                </button>
            </div>
        </section>
    );
}
