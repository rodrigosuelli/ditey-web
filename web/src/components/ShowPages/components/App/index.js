import React from 'react';
import { FaMobileAlt, FaTachometerAlt, FaRegLightbulb } from 'react-icons/fa';

import './styles.css';

import iphoneImg from '../../../../assets/Apple iPhone X Space Grey.png';
import googlePlayImg from '../../../../assets/badges/google-play-badge.png';

export default function App(props) {
  let appClass = 'app-container';
  if (props.active) appClass += ' active';

  return (
    <div className={appClass}>
      <h1>Nosso App</h1>
      <div className="app-description">
        <div className="app-text">
          <div className="block one">
            <h2>Motivação</h2>
            <h3>
              Funcionalidades como pausar, retomar e comandos de voz não
              funcionam em dispositivos movéis, mas não fique triste, instalando
              o aplicativo você poderá usar esses e muitos outros recursos
              exclusivos do app.
            </h3>
          </div>
          <div className="block two">
            <h2>Vantagens</h2>
            <div className="features">
              <div className="feat-one">
                <div className="oval-div">
                  <FaMobileAlt color="#6a42f4" size={64} />
                </div>
                <h4>Mobilidade</h4>
              </div>
              <div className="feat-two">
                <div className="oval-div">
                  <FaTachometerAlt color="#6a42f4" size={64} />
                </div>
                <h4>Desempenho</h4>
              </div>
              <div className="feat-three">
                <div className="oval-div">
                  <FaRegLightbulb color="#6a42f4" size={64} />
                </div>
                <h4>Recursos Exclusivos</h4>
              </div>
            </div>
          </div>
          <div className="block three">
            <h2>Download</h2>
            <div className="img-div">
              <img src={googlePlayImg} alt="google play" />
            </div>
          </div>
        </div>
        <img className="phone-img" src={iphoneImg} alt="iphone" />
      </div>
    </div>
  );
}
