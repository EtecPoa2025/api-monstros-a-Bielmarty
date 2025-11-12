// 1. Importar o módulo Express
const express = require('express');
const cors = require('cors');
const database = require('better-sqlite3');
const path = require('path');

const DB_FILE = path.join(__dirname, 'monstros.db');

const db = new database(DB_FILE);


// 2. Criar uma instância do aplicativo Express
const app = express();
app.use(cors({ origin: '*' }));

// 3. Definir a porta em que o servidor irá escutar
// Usamos process.env.PORT para compatibilidade com ambientes de hospedagem (como Heroku)
// ou a porta 3000 como padrão se a variável de ambiente não estiver definida.
const PORT = process.env.PORT || 3000;

// --- Dados Temporários em Memória ---
// Agora os monstros são carregados de um arquivo JSON externo.

// --- Rotas da API ---
app.get('/monstros/:monstros_id', (req, res) => {
    const id = number(req.params.monstros_id);
    const monstro = db.getMonstrosById(id);

    if (monstro){
        res.json(monstro);
    }
    else {
        res.status(400).json({Erro: "Nenhum monstro foi encontrado :/"})
    }
})


app.post('/monstros', (req, res) => {
    const corpo = req.body;
    const novo_Monstro = insertMonstro(corpo);
    return res.status(201).json(novo_Monstro);
})
// Rota GET para listar todos os monstros
// Quando alguém fizer uma requisição GET para a URL base + '/monstros'
// (ex: http://localhost:3000/monstros), esta função será executada.        
    // Retorna a array de monstros como uma resposta JSON
    app.get('/monstros', (req, res) => {
    const habitatMonstro = req.query.habitat_monstro;
    const danoMonstroFraco = req.query.dano_monstroFraco;
    const danoMonstroForte = req.query.dano_monstroForte;

    let resultado = getAllMonstros();

    if (habitatMonstro) {
        resultado = resultado.filter(m => m.habitat_monstro == habitatMonstro);
    }

    if (danoMonstroFraco) {
        resultado = resultado.filter(m => m.dano_monstro <= (danoMonstroFraco));
    }

    if (danoMonstroForte) {
        resultado = resultado.filter(m => m.dano_monstro >= (danoMonstroForte));
    }

    res.json(resultado);
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

function getAllMonstros(){
    const resultado = db.prepare('Select * from monstros')
    return resultado.all();
}

function getMonstrosById(id){
    const resultado = db.prepare('Select * from monstros where id= ?')
    return resultado.get(id);
}

function insertMonstro(monstro){
    const resultado = db.prepare(`
        insert into monstros (
        nome, 
        imagem,
        descricao,
        tipo_criatura,
        pontos_vida,
        ataque,
        defesa,
        habitat
        )
        values (@nome, @imagem, @descricao, @tipo criatura, @pontos_vida, @ataque, @defesa, @habitat) 
        `)
    const novo = resultado.run({
        nome: monstro.nome, 
        imagem: monstro.imagem,
        descricao: monstro.descricao,
        tipo_criatura: monstro.tipo_criatura,
        pontos_vida: monstro.pontos_vida,
        ataque: monstro.ataque,
        defesa: monstro.defesa,
        habitat: monstro.habitat
    })
    return getMonstrosById(novo.LastInsertedRowid)
}

/*
// Rota GET para retornar um monstro by ID
app.get('/monstros/:monstro_id', (req, res) => {

    // Descubra como pegar o ID passado pela URL através do atributo req.params 
    let id = req.params._____;
    // Pesquise sobre o método find em javascript e filtre o monstro por ID.
    // Vale 15 pts
    let monstro = ________________ ;

    if (monstro) {
        res.json(monstro)
    } else {
        res.status(404).json({ erro: 'Nenhum monstro encontrado.' });
    }
});
*/

// --- Iniciar o Servidor ---

// Faz o aplicativo Express começar a "escutar" por requisições na porta definida.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/monstros`);
});
