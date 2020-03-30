import React from 'react';

import { Link } from 'react-router-dom';

import './styles.css'

function Header(props) {
    return(
        <header>
            <div className="left-menu">
                <div onClick={props.click} className="hamburger">
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