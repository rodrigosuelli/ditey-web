import React, {useState} from 'react';

import { Link } from 'react-router-dom';

import './styles.css'

export default function Header() {
    const [menu, setMenu] = useState(false);

    function handleToggleMenu() {
        if (menu === false) {
            document.body.style.overflow = "hidden";
            return setMenu(true);
        }
        
        document.body.style.overflow = "initial";
        return setMenu(false);
    }

    let className = 'menu-container';
    if (menu === true) {
            className += ' on';
    }

    return(
        <header className={className}>
            <div className="logo-container">
                <div onClick={handleToggleMenu} 
                className="hamburger"
                >
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
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
                     <Link className="nav-link" to="#">nosso app</Link>
                 </li>
                 <li className="nav-item">
                     <Link className="nav-link" to="#">avalie</Link>
                 </li>
             </ul>
            </nav>
        </header>
    );
}