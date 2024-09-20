// Importa o módulo 'express', que é um framework web para Node.js.
const express = require('express');

// Cria uma aplicação Express.
const app = express();

// Define a porta na qual o servidor vai escutar as requisições.
const port = 3000;

// Define uma rota para a raiz ('/') da aplicação.
// Quando o servidor recebe uma requisição GET na raiz, ele envia a resposta 'Hello World!'.
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Inicia o servidor e faz com que ele escute na porta especificada.
// Exibe uma mensagem no console indicando que o servidor está rodando.
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
