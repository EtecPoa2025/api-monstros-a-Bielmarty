// 1. Importar o módulo Express
const express = require('express');
const cors = require('cors');

// 2. Criar uma instância do aplicativo Express
const app = express();
app.use(cors({ origin: '*' }));

// 3. Definir a porta em que o servidor irá escutar
// Usamos process.env.PORT para compatibilidade com ambientes de hospedagem (como Heroku)
// ou a porta 3000 como padrão se a variável de ambiente não estiver definida.
const PORT = process.env.PORT || 3000;

// --- Dados Temporários em Memória ---
// Agora os monstros são carregados de um arquivo JSON externo.
const monstros = require('./monstros.json');

// --- Rotas da API ---

// Rota GET para listar todos os monstros
// Quando alguém fizer uma requisição GET para a URL base + '/monstros'
// (ex: http://localhost:3000/monstros), esta função será executada.
app.get('/monstros', (req, res) => {
    // Retorna a array de monstros como uma resposta JSON
    const habitatMonstro = req.query.habitat_monstro;
    const danoMonstroFraco = req.query.dano_monstro;
    const danoMonstroforte = req.query.dano_monstro;

    let resultado = monstros; 
    if (habitatMonstro) {
    resultado = resultado.filter(m => m.habitat_monstro == habitatMonstro);
    }
    
    if (danoMonstroFraco) {
    resultado = resultado.filter(m => m.dano_monstro <= danoMonstro);
    }

    if (danoMonstroforte) {
    resultado = resultado.filter(m => m.dano_monstro >= danoMonstro);
    }
    res.json(monstros);
});


//GRUPO SCP


app.get('/monstros/random', (req, res) => {
    const index = Math.floor(Math.random()* monstros.length);
    res.json(monstros[index]);
if (monstros.length > 0) {
    res.status(404).json({erro: 'Nenhum monstro encontrado'});
} else{
       
}
});

// --- Iniciar o Servidor ---

// Faz o aplicativo Express começar a "escutar" por requisições na porta definida.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/monstros`);
});
