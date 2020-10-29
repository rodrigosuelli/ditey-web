# Ditey

![Screenshot](./.github/app-preview.png)

## 📌 Índice

- [Tecnologias](#-tecnologias)
- [Projeto](#-projeto)
- [Observações](#observações)
- [Layout](#-layout)
- [Instalação](#-instalação)
- [Como contribuir](#-como-contribuir)
- [Licença](#memo-licença)

## ⚙ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## 💻 Projeto

Esse é o front-end do servidor [ditey-api](https://github.com/rodrigosuelli/ditey-api).

O Ditey é um leitor de textos que visa facilitar a vida das pessoas ao trabalharem com leitura, transcrição e
anotação de textos. O Ditey permite que o usuário mantenha seus textos salvos no banco de dados, e mude a velocidade e a
voz da
fala. Por baixo dos panos, o Ditey usa a [Web Speech
API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) para fazer a leitura dos textos.

## Observações

- Devido a compatibilidade da [Web Speech
  API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), algumas funções do projeto podem não funcionar
  corretamente em alguns navegadores.

## 🔖 Layout

Você pode visualizar o layout do projeto através desse [link](https://www.figma.com/file/hgQpYoXRdoP9ht9JF1V26N/Ditey). Lembrando que você precisa ter uma conta no Figma para poder interagir com os componentes do layout.

## 🚀 Instalação

### Pré-requisitos

- Ter [**Git**](https://git-scm.com/) para clonar o projeto.
- Ter [**Node.js**](https://nodejs.org/en/) instalado.
- Ter um gerenciador de pacotes como [**NPM**](https://www.npmjs.com/get-npm) ou [**Yarn**](https://classic.yarnpkg.com/en/) para instalar as dependências do projeto.

### Clonando o Repositório

```bash
$ git clone https://github.com/rodrigosuelli/ditey-web.git

$ cd ditey-web
```

### Instalando as dependências

```bash
$ npm install

# ou

$ yarn
```

### Conectando a aplicação com o servidor

Siga as instruções em [**ditey-api**](https://github.com/rodrigosuelli/ditey-web) para iniciar o servidor e deixar ele rodando na sua máquina na porta (3333).

### Executando o projeto

```bash
$ npm run start

# ou

$ yarn start
```

## 🤔 Como contribuir

1. Faça um fork desse repositório
2. Faça um clone do seu fork (`git clone url-do-seu-fork && cd ditey-web`)
3. Crie uma branch com sua feature ou correção de bugs (`git checkout -b minha-branch`)
4. Faça commit das suas alterações (`git commit -m 'feature/bugfix: minhas alterações'`)
5. Faça push para a sua branch (`git push origin minha-branch`)
6. Abra sua Pull Request no repositório que você fez o fork

## 📝 Licença

Este projeto está licenciado sob a licença [MIT](./LICENSE).
