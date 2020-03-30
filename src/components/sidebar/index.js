import React from 'react';
import { push as BurgerMenu } from 'react-burger-menu';

import './styles.css';

function Sidebar(props) {  
    return(
        <BurgerMenu isOpen={props.isOpen}
        noOverlay 
        pageWrapId={"content"} 
        outerContainerId={"main-container"}
        customCrossIcon={ false } 
        customBurgerIcon={ false }
        width={ 250 }
        >
            <h3 className="title">Textos Salvos:</h3>
            {/* <h3 className="btn-add"> + </h3> */}
            <button className="btn-add">+</button>
        </BurgerMenu>
    );
}

export default Sidebar;