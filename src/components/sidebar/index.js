import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import './styles.css';

export default function Sidebar(props) {
    

    function loadedTexts(index, Btnclass) {
        return(
            <div key={index} className="text-container">
                <div className="text">
                    {showText()}
                </div>
                    
                <button onClick={() => props.onTextDelete(index)} className={Btnclass}>
                <FiTrash2 className="trash-icon" size={20} />
                </button>
            </div>            
        );
    }

    function showText() {
        if (props.text === '') {
            return <p className="text-preview">Insira seu texto aqui...</p>
        }
        return <p className="text-preview">{props.text}</p>
    };


    return(
        <aside>
            <h3 className="title">Textos Salvos:</h3>
            <button onClick={() => {
                props.onTextAdd();
            }} 
            title="Adicionar Texto" 
            className="btn-add"
            >
                +
            </button>
            {props.texts.map((item, index) => {
                var Btnclass = '';
                index === props.activeText ? Btnclass = 'trash-disable' : Btnclass = 'trash';

                return loadedTexts(index, Btnclass);
            })
         }
        </aside>
    );
}