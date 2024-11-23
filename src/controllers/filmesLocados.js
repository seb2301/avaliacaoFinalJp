const ServiceFilmesLocados = require('../services/filmesLocados')

class ControllerFilmesLocados {
    async LocarFilme(req, res) {
        try {
            const { idFilme, idCliente } = req.params
            const { dataLocacao, dataDevolucao } = req.body

            const filmesLocados = await ServiceFilmesLocados.LocarFilmes(idFilme, idCliente, dataLocacao, dataDevolucao)
            return res.status(201).send({ filmesLocados: filmesLocados })
        } catch (e) {
            return res.status(400).send({ error: `Erro de locação ${e.message}` })
        }
    }

    async Devolucao(req, res) {
        try {
            const { id } = req.params

            const filmesLocados = await ServiceFilmesLocados.Devolucao(id)
            return res.status(201).send({ filmesLocados: filmesLocados })
        } catch (e) {
            return res.status(400).send({ error: `Erro na devolução ${e.message}` })
        }
    }
}

module.exports = new ControllerFilmesLocados()