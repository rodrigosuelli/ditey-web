import React, {useState} from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import { Link } from 'react-router-dom';

import './styles.css'

export default function Header(props) {
    const [menu, setMenu] = useState(false);

    function handleToggleMenu() {
        if (menu === false) {
            document.body.style.overflow = "hidden";
            return setMenu(true);
        }

        document.body.style.overflow = "initial";
        return setMenu(false);
    }

    function handleAnchorLink() {
        if (className === 'menu-container on'){
            handleToggleMenu();
        }
        return;
    }

    let className = 'menu-container';
    if (menu === true) className += ' on';

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
                    <AnchorLink
                    className="nav-link" 
                    offset={() => 40}
                    onClick={() => {
                        handleAnchorLink();
                        props.onPageChange('Meet');
                    }} 
                    href='#pages'>
                        Conheça
                    </AnchorLink>
                </li>
                <li className="nav-item">
                    <AnchorLink
                    className="nav-link" 
                    offset={() => 40}
                    onClick={() => {
                        handleAnchorLink();
                        props.onPageChange('Team');
                    }} 
                    href='#pages'>
                        Quem Somos
                    </AnchorLink>
                </li>
                <li className="nav-item">
                    <AnchorLink
                    className="nav-link" 
                    offset={() => 40}
                    onClick={() => {
                        handleAnchorLink();
                        props.onPageChange('App');
                    }} 
                    href='#pages'>
                        Nosso App
                    </AnchorLink>
                </li>
                <li className="nav-item">
                    <AnchorLink
                    className="nav-link" 
                    offset={() => 40}
                    onClick={() => {
                        handleAnchorLink();
                        props.onPageChange('Rate');
                    }} 
                    href='#pages'>
                        Avalie
                    </AnchorLink>
                </li>
             </ul>
            </nav>
        </header>
    );
}