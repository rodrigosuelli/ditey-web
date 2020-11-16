import React from 'react';
import { Helmet } from 'react-helmet';
import { HashLink } from 'react-router-hash-link';

import Layout from '../../components/Layout/Layout';

import appPreviewImg from '../../images/app-preview.png';
import finishLineImg from '../../images/svg/undraw_finish_line.svg';
import modernLifeImg from '../../images/svg/undraw_modern_life.svg';
import speechToTextImg from '../../images/svg/undraw_speech_to_text.svg';
import webDevicesImg from '../../images/svg/undraw_web_devices.svg';

import './Home.css';

export default function Home() {
  return (
    <Layout>
      <div id="home-page">
        <Helmet title="Ditey - Trabalhe com textos na velocidade do som." />

        <h1 className="slogan">
          Trabalhe com textos na <br /> velocidade do som<b>.</b>
        </h1>
        <div className="button-container">
          <p className="sub">
            Chega de se estressar lendo e copiando <br /> textos e artigos
            longos.
          </p>
          <HashLink smooth to="/dashboard#" className="primary">
            Acessar a plataforma
          </HashLink>
        </div>
        <img className="app-preview" src={appPreviewImg} alt="app-preview" />

        <section className="promotion">
          <div className="description">
            <div className="marker" />
            <h2>Problemas com a lição de casa?</h2>
            <p>
              Coloque a velocidade de fala em 0.1 ou use nosso app para ter
              pausa entre palavras e termine de copiar esse texto na velocidade
              da luz.
            </p>
          </div>
          <img src={finishLineImg} alt="finish line" />
        </section>

        <section className="promotion">
          <div className="description">
            <div className="marker" />
            <h2>Acesse seus textos em qualquer lugar</h2>
            <p>
              Ditey permite que você mantenha até 5 textos salvos na nuvem, sem
              pagar um centavo.
            </p>
          </div>
          <img src={modernLifeImg} alt="finish line" />
        </section>

        <section className="promotion">
          <div className="description">
            <div className="marker" />
            <h2>Economize clicks com os comandos de voz</h2>
            <p>
              Articulações cansadas? Aperte Ctrl na nossa plataforma para
              usufruir dos comandos de voz e economizar clicks.
            </p>
          </div>
          <img src={speechToTextImg} alt="finish line" />
        </section>

        <section className="promotion">
          <div className="description">
            <div className="marker" />
            <h2>Baixe nosso app</h2>
            <p>
              Instalando nosso aplicativo você terá acesso a features exclusivas
              como pausa entre palavras para auxilar na transcrição de textos.
            </p>
          </div>
          <img src={webDevicesImg} alt="finish line" />
        </section>

        <div className="start-using">
          <div className="flex-line">
            <h2>
              Comece a utilizar <b>agora</b> <br /> mesmo.
            </h2>
          </div>
          <div className="flex-line">
            <p>
              Ditey é o leitor de textos mais completo do mercado, possuindo uma
              interface moderna e funcionalidades inovadoras.
            </p>
            <HashLink smooth to="/register#" className="primary">
              Criar conta
            </HashLink>
          </div>
        </div>
      </div>
    </Layout>
  );
}
