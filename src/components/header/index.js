import React from 'react';

import { Link } from 'react-router-dom';

import './styles.css'

function Header() {
    return(
        <header>
            <div className="logo-container">
                <div className="hamburger">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <Link className="logo" to="/">
                <span className="logo-brand">ditey</span>
                </Link>
            </div>
            
            <nav>
             <ul className="nav-links">
                 <li className="nav-item">
                     <Link className="nav-link" to="#">comandos</Link>
                 </li>
                 <li className="nav-item">
                     <Link className="nav-link" to="#">quem somos</Link>
                 </li>
                 <li className="nav-item">
                     <Link className="nav-link" to="#">avalie</Link>
                 </li>
                 <li className="nav-item">
                     <Link className="nav-link" to="#">nosso app</Link>
                 </li>
             </ul>
            </nav>
        </header>
    );
}

export default Header;