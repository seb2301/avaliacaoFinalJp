const ModelFilmesLocados = require('../models/filmesLocados')
const ModelFilme = require('./../models/filme')
const ModelCliente = require('./../models/cliente')

class ServiceFilmesLocados {
    async LocarFilmes(idFilme, idCliente, dataLocacao, dataDevolucao) {
        if (!idFilme || !idCliente || !dataLocacao || !dataDevolucao) {
            throw new Error('Preencha todos os campos!')
        }

        const filme = await ModelFilme.findByPk(idFilme)
        if (!filme) {
            throw new Error('Filme não existe')
        }

        const cliente = await ModelCliente.findByPk(idCliente)
        if (!cliente) {
            throw new Error('Cliente não existe')
        }

        return await ModelFilmesLocados.create({
            idFilme,
            idCliente,
            dataLocacao,
            dataDevolucao,
            devolvido: false
        })
    }

    async DevolverFilmes(id) {
        if (!id) {
            throw new Error('Informar ID')
        }

        const filmesLocados = await ModelFilmesLocados.findByPk(id)
        if (!filmesLocados) {
            throw new Error('Filme em aluguel não encontrado')
        }

        filmesLocados.devolvido = true
        filmesLocados.save()

        return filmesLocados
    }
}

module.exports = new ServiceFilmesLocados()