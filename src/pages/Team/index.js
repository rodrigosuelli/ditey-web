import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import './styles.css';

import RodrigoImg from '../../assets/profile-pics/rodrigo.jpg';
import LucasImg from '../../assets/profile-pics/lucas.jpg';
import GabrielImg from '../../assets/profile-pics/gabriel.jpg';
import EusebioImg from '../../assets/profile-pics/eusebio.jpg';
import JoseImg from '../../assets/profile-pics/jose.jpg';
import WorkTogetherImg from '../../assets/svg/undraw_work_together.svg';

export default function OurTeam() {
  return (
    <div className="team-container">
      <h1>Nosso Time</h1>
      <div className="cards">
        <div className="card one">
          <h3>José Murilo</h3>
          <div className="profile-pic">
            <img src={JoseImg} alt="profile-img" />
          </div>
          <h4>Entrepreneur && Coach</h4>
          <p>Estudante apaixonado por tecnologia e programação.</p>
          <div className="links">
            <a href="https://github.com/f1gure" target="_blank" rel="noopener noreferrer">
              <FaGithub color="#fff" size={40} />
            </a>
            <a
              href="https://www.linkedin.com/in/josé-murilo-rodrigues-sabalo-351a33185"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin color="#fff" size={40} />
            </a>
          </div>
        </div>

        <div className="card two">
          <h3>Gabriel Santim</h3>
          <div className="profile-pic">
            <img src={GabrielImg} alt="profile-img" />
          </div>
          <h4>Founder && Database Administrator</h4>
          <p>Estudante apaixonado por tecnologia e programação.</p>
          <div className="links">
            <a href="https://github.com/GabrielSBova" target="_blank" rel="noopener noreferrer">
              <FaGithub color="#fff" size={40} />
            </a>
            <a href="https://www.linkedin.com/in/gabriel-bova-44b1b3184/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin color="#fff" size={40} />
            </a>
          </div>
        </div>

        <div className="card three">
          <h3>Rodrigo Suélli</h3>
          <div className="profile-pic">
            <img src={RodrigoImg} alt="profile-img" />
          </div>
          <h4>Founder && Web Developer</h4>
          <p>Estudante apaixonado por tecnologia e programação.</p>
          <div className="links">
            <a href="https://github.com/rodrigosuelli" target="_blank" rel="noopener noreferrer">
              <FaGithub color="#fff" size={40} />
            </a>
            <a
              href="https://www.linkedin.com/in/rodrigo-henrique-suélli-5b6b69190"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin color="#fff" size={40} />
            </a>
          </div>
        </div>

        <div className="card four">
          <h3>Eusébio Leite</h3>
          <div className="profile-pic">
            <img src={EusebioImg} alt="profile-img" />
          </div>
          <h4>Founder && Mobile Developer</h4>
          <p>Estudante apaixonado por tecnologia e programação.</p>
          <div className="links">
            <a href="https://github.com/muun0" target="_blank" rel="noopener noreferrer">
              <FaGithub color="#fff" size={40} />
            </a>
            <a href="https://www.linkedin.com/in/eusebio-mackenzie-leite" target="_blank" rel="noopener noreferrer">
              <FaLinkedin color="#fff" size={40} />
            </a>
          </div>
        </div>

        <div className="card five">
          <h3>Lucas Tadeu</h3>
          <div className="profile-pic">
            <img src={LucasImg} alt="profile-img" />
          </div>
          <h4>Decision Making && Marketing Specialist</h4>
          <p>Estudante apaixonado por tecnologia e programação.</p>
          <div className="links">
            <a href="https://github.com/lucastmendoncaf" target="_blank" rel="noopener noreferrer">
              <FaGithub color="#fff" size={40} />
            </a>
            <a href="https://www.linkedin.com/in/lucas-ferreira-076a28197/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin color="#fff" size={40} />
            </a>
          </div>
        </div>
      </div>

      <div className="team-description">
        <img src={WorkTogetherImg} alt="studyingVector" />
        <div className="team-text">
          <h1>Uma Equipe Completa</h1>
          <h2>
            Somos da Karin, um grupo de pessoas incríveis, comprometidas em dar o seu máximo para entregar um bom
            produto para o cliente.
          </h2>
        </div>
      </div>
    </div>
  );
}
