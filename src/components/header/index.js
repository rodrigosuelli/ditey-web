import React from 'react';

import './styles.css'

function Header() {
    return(
        <header>
            <a className="logo" href="#">
            <span className="logo-brand">ditey</span>
            </a>
             <ul className="right-nav">
                 <li className="nav-item">
                     <a className="nav-link" href="#">comandos</a>
                 </li>
                 <li className="nav-item">
                     <a className="nav-link" href="#">quem somos</a>
                 </li>
                 <li className="nav-item">
                     <a className="nav-link" href="#">avalie</a>
                 </li>
                 <li className="nav-item">
                     <a className="nav-link" href="#">nosso app</a>
                 </li>
              </ul>
        </header>
    );
}

export default Header;