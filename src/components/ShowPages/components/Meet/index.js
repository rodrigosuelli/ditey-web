import React from 'react';
import { FaDownload, FaInfinity, FaMicrophone } from 'react-icons/fa';

import './styles.css';

import readingImg from '../../../../assets/svg/undraw_reading.svg';
import studyingImg from '../../../../assets/svg/undraw_studying.svg';

export default function Meet(props) {
  let meetClass = 'meet-container';
  if (props.active) meetClass += ' active';

  return (
    <div className={meetClass}>
      <h1>Conheça o ditey</h1>
      <div className="meet-description">
        <div className="meet-text">
          <h2>
            Um poderoso leitor de textos, que pode ser usado para te ajudar em
            casa, na escola ou no trabalho.
          </h2>

          <div className="features">
            <div className="feat-one">
              <div className="oval-div">
                <FaDownload color="#6c63ff" size={64} />
              </div>
              <h4>Salve até 5 textos no seu navegador</h4>
            </div>
            <div className="feat-two">
              <div className="oval-div">
                <FaInfinity color="#6c63ff" size={64} />
              </div>
              <h4>Sem limite de caracteres</h4>
            </div>
            <div className="feat-three">
              <div className="oval-div">
                <FaMicrophone color="#6c63ff" size={64} />
              </div>
              <h4>Comandos de voz</h4>
            </div>
          </div>
        </div>
        <img src={readingImg} alt="readingTimeVector" />
      </div>

      <div className="meet-description start">
        <img src={studyingImg} alt="studyingVector" />
        <div className="meet-text two">
          <h1>Problemas com a lição de casa?</h1>
          <h2>
            Coloque a velocidade de fala em 0.1 e termine de copiar esse texto
            na velocidade da luz !
          </h2>
        </div>
      </div>
    </div>
  );
}
