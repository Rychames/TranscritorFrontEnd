#TranscritorFrontEnd

Este é o repositório do TranscritorFrontEnd, uma aplicação React que permite converter texto em fala e fala em texto de forma simples e intuitiva. Utilizando React.js para a construção da interface e Bootstrap para estilização.

Funcionalidades

Transcrição de áudio para texto

Leitura de texto em voz alta

Interface amigável e responsiva

Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

Node.js (versão LTS recomendada): Baixar Node.js

npm (instalado com o Node.js)

Como rodar o projeto

Clone o repositório:

É recomendado nomear o diretório como frontend ao clonar o projeto:

git clone https://github.com/Rychames/TranscritorFrontEnd.git frontend

Acesse o diretório do projeto:

cd frontend

Instale as dependências:

npm install

Inicie o servidor de desenvolvimento:

npm start

Acesse a aplicação:
Abra o navegador e vá para: http://localhost:3000

Estrutura do Projeto

O projeto segue a seguinte estrutura de pastas:

├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── apis
│   │   ├── InterviewAPI.js
│   │   ├── SpeechToTextAPI.js
│   │   └── TextToSpeechAPI.js
│   ├── components
│   │   ├── AudioPlayer.js
│   │   ├── AudioUpload.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── SpeechToText.js
│   │   ├── TextToSpeech.js
│   │   └── TextToSpeechComponent.js
│   ├── pages
│   │   ├── CreateInterviewPage.js
│   │   ├── EditInterviewPage.js
│   │   ├── Home.js
│   │   ├── InterviewPage.js
│   │   └── SelectInterviewPage.js
│   ├── styles
│   │   ├── AudioPlayer.css
│   │   └── InterviewPage.css
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

Tecnologias utilizadas

React.js: Biblioteca JavaScript para construção de interfaces de usuário.

Bootstrap: Framework CSS para estilização responsiva.



