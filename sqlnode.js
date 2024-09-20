//Importa o módulo 'express' para criar o servidor web 
const express = require('express')
//Importa o módulo 'sqlite3' e ativa o modo 'verbose' para obter mensagem detalhadas da depuração
const sqlite3 = require('sqlite3').verbose();

//Cria uma nova instancia de aplicação Express.
const app = express();
//Define a porta onde o servidor vai escutar as requisições
const port = 3000;

//Cria uma nova instância do banco de dados SQLlite na memória.
//':memory:' significa que o banco de dados será armazenado na RAM e será perdido quando o processo terminar.
const db = new sqlite3.Database(':memory:');

//Configura o banco de dados e insere alguns dados de exemplo.
db.serialize(() => {
    //Cria uma nova tabela chamada 'user' com duas colunas: 'id' e 'name'
    db.run('CREATE TABLE user (id INT, name TEXT)')

    //Insere alguns registros de exemplo na tabela 'user'. 
    const stmt = db.prepare('INSERT INTO user (id, name) VALUES (? , ?)');
    stmt.run(1, 'Silvio santos');
    stmt.run(2, 'Maria josé');
    stmt.finalize();
});
//Define uma rota de GET para '/users' que retornara todos os registros da tabela 'user' como JSON.
app.get('/users', (req, res) => {
    //Executa uma consulta SQL para selecionar todos os registros da tabela 'user'
    db.all('SELECT * FROM user', [], (err,rows) => {
        if(err){
            //Se ocorrer um erro, lança uma exceção.
            throw err; 
        }
        //Envia resposta como JSON com os dados obtidos.
        res.json(rows);
    })
});
// Inicia o servidor e faz com que ele escute na porta especificada.
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});