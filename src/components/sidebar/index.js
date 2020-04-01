import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import './styles.css';

function Sidebar(props) { 

    function showText() {
        if (props.text === '') {
            return <p className="text-preview">Insira seu texto aqui...</p>
        }
        return <p className="text-preview">{props.text}</p>
    };
    
    return(
        <aside>
            <h3 className="title">Textos Salvos:</h3>
            {/* <h3 className="btn-add"> + </h3> */}
            <button title="Adicionar Texto" className="btn-add">+</button>

            <div className="text-container">
                <div className="text">
                {showText()}
                </div>
                <button className="trash">
                <FiTrash2 className="trash-icon" size={20} />
                </button>
            </div>
    
        </aside>
    );
}

export default Sidebar;