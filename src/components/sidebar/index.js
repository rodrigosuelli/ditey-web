import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import './styles.css';

export default function Sidebar(props) {
    

    function loadedTexts(index, btnClass, divClass) {
        return(
            <div key={index} 
            className={`text-container ${divClass}`}
            >
                <div onClick={() => props.onChangeActiveText(index)} 
                className={`text ${divClass}`}
                >
                    {showText(index)}
                </div>
                    
                <button onClick={() => props.onTextDelete(index)} className={btnClass}>
                <FiTrash2 className="trash-icon" size={20} />
                </button>
            </div>            
        );
    }

    function showText(i) {
        if (props.texts[i] === '') {
            return <p className="text-preview">Insira seu texto aqui...</p>
        }
        return <p className="text-preview">{props.texts[i]}</p>
    };


    return(
        <aside>
            <h3 className="title">Textos Salvos:</h3>
            <button onClick={() => props.onTextAdd()} 
            title="Adicionar Texto" 
            className="btn-add"
            >
                +
            </button>
            {props.texts.map((item, index) => {
                var btnClass = index === props.activeText ? 'trash-disable' : 'trash';
                var divClass = index === props.activeText ? 'active' : '';

                return loadedTexts(index, btnClass, divClass);
            })
         }
        </aside>
    );
}