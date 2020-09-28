import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Layout from '../../components/Layout';

import rodrigoPic from '../../assets/profile-pics/rodrigo.jpg';
import eusebioPic from '../../assets/profile-pics/eusebio.jpg';
import gabrielPic from '../../assets/profile-pics/gabriel.jpg';
import lucasPic from '../../assets/profile-pics/lucas.jpg';
import josePic from '../../assets/profile-pics/jose.jpg';

import './styles.css';

export default function Team() {
  return (
    <Layout>
      <h1 className="title">Nosso Time</h1>
      <div className="cards">
        <div className="card">
          <div className="portfolio">
            <a
              href="https://www.linkedin.com/in/rodrigosuelli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/rodrigosuelli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={18} />
            </a>
          </div>
          <div className="wrapper">
            <img className="profile-pic" src={rodrigoPic} alt="profile-pic" />
            <div className="info">
              <h3 className="name">Rodrigo Henrique Suélli</h3>
              <p className="role">Web Developer</p>
            </div>
          </div>
          <p className="status">
            Apaixonado por tecnologia e programação. Focando na stack Node,
            React e React Native.
          </p>
        </div>
        <div className="card">
          <div className="portfolio">
            <a
              href="https://www.linkedin.com/in/eusebio-mackenzie-leite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/muun0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={18} />
            </a>
          </div>
          <div className="wrapper">
            <img className="profile-pic" src={eusebioPic} alt="profile-pic" />
            <div className="info">
              <h3 className="name">Eusébio Leite</h3>
              <p className="role">Android Developer</p>
            </div>
          </div>
          <p className="status">
            Atualmente aprendendo as tecnologias do ecossistema Java.
          </p>
        </div>
        <div className="card">
          <div className="portfolio">
            <a
              href="https://www.linkedin.com/in/gabriel-bova-44b1b3184/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/GabrielSBova"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={18} />
            </a>
          </div>
          <div className="wrapper">
            <img className="profile-pic" src={gabrielPic} alt="profile-pic" />
            <div className="info">
              <h3 className="name">Gabriel Santim </h3>
              <p className="role">Data Scientist</p>
            </div>
          </div>
          <p className="status">
            Buscando conhecimentos na área de Data Science e Machine Learning.
          </p>
        </div>
        <div className="card">
          <div className="portfolio">
            <a
              href="https://www.linkedin.com/in/lucas-ferreira-076a28197/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/lucastmendoncaf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={18} />
            </a>
          </div>
          <div className="wrapper">
            <img className="profile-pic" src={lucasPic} alt="profile-pic" />
            <div className="info">
              <h3 className="name">Lucas Tadeu</h3>
              <p className="role">Marketing Specialist</p>
            </div>
          </div>
          <p className="status">
            Líder de equipes e negociante por natureza. Curto games e
            eletrônica.
          </p>
        </div>
        <div className="card">
          <div className="portfolio">
            <a
              href="https://www.linkedin.com/in/jos%C3%A9-murilo-rodrigues-sabalo-351a33185"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/f1gure"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={18} />
            </a>
          </div>
          <div className="wrapper">
            <img className="profile-pic" src={josePic} alt="profile-pic" />
            <div className="info">
              <h3 className="name">José Murilo</h3>
              <p className="role">Coach</p>
            </div>
          </div>
          <p className="status">
            Autônomo apaixonado por hardware, games e música.
          </p>
        </div>
      </div>
    </Layout>
  );
}
