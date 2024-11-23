const express = require('express')
const database = require('./src/config/database')

const routerCliente = require('./src/routes/cliente')
const routerFilme = require('./src/routes/filme')
const routerFilmesLocados = require('./src/routes/filmesLocados')

const app = express()
app.use(express.json())
app.use('/api/cliente', routerCliente)
app.use('/api/filme', routerFilme, routerFilmesLocados)


const PORT = 3500

database.db
    .sync({ force: false })
    .then((_) => {
        console.info('Banco conectado com sucesso!')
        app.listen(PORT, () => {
            console.info(`Servidor está rodando na porta ${PORT}.`)
        })
    })
    .catch((e) => {
        console.error(`Conexão falhou ${e}`)
    })