import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FaGithub } from 'react-icons/fa';

import './styles.css';

export default function Footer(props) {
  return (
    <footer>
        <div className="footer-container">
            <div className="list-container">
                <h3 className="list-title">Links</h3>
                <ul>
                    <li>
                        <AnchorLink 
                        offset={() => 40}
                        onClick={() => props.onPageChange('Meet')} 
                        href='#pages'>
                            Conheça
                        </AnchorLink>
                    </li>
                    <li>
                        <AnchorLink 
                        offset={() => 40}
                        onClick={() => props.onPageChange('Team')} 
                        href='#pages'>
                            Quem Somos
                        </AnchorLink>
                    </li>
                    <li>
                        <AnchorLink 
                        offset={() => 40}
                        onClick={() => props.onPageChange('App')} 
                        href='#pages'>
                            Nosso App
                        </AnchorLink>
                    </li>
                    <li>
                        <AnchorLink 
                        offset={() => 40}
                        onClick={() => props.onPageChange('Rate')} 
                        href='#pages'>
                            Avalie
                        </AnchorLink>
                    </li>
                </ul>
            </div>
            <div className="list-container">
                <h3 className="list-title">Nosso Time</h3>
                <ul>
                    <li>Rodrigo</li>
                    <li>Eusébio</li>
                    <li>Lucas Tadeu</li>
                    <li>Gabriel Santim</li>
                    <li>José Murilo</li>
                </ul>
            </div>
            <div className="list-container logo">
                <p className="footer-logo">ditey</p>
                <p className="copyright">Copyright &copy; Karin Technologic Solutions 2020</p>
                <a className="align-center" href="https://github.com/rodrigosuelli/ditey" 
                target="_blank" 
                rel="noopener noreferrer">
                <FaGithub color="#fff" size={40} />
                </a>
            </div>
        </div>
    </footer>
  );
}
