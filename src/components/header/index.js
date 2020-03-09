import React from 'react';

import './styles.css'

function Header() {
    return(
        <header>
            <a className="logo" href="#">
            <span className="logo-brand">ditey</span>
            </a>
            <nav>
                <div className="hamburger">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
             <ul className="nav-links">
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
            </nav>
        </header>
    );
}

export default Header;