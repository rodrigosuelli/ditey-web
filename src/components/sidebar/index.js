import React from 'react';

import './styles.css';

function Sidebar() {  
    return(
        <aside>
            <h3 className="title">Textos Salvos:</h3>
            {/* <h3 className="btn-add"> + </h3> */}
            <button title="Adicionar Texto" className="btn-add">+</button>
        </aside>
    );
}

export default Sidebar;