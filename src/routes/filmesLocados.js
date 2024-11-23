const express = require('express')
const ControllerFilmesLocados = require('../controllers/filmesLocados')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/locar/:idFilme/:idCliente', auth, ControllerFilmesLocados.LocarFilme)
router.put('/devolucao/:id', auth, ControllerFilmesLocados.Devolucao)

module.exports = router