const ServiceCliente = require('./../services/cliente')

class ControllerCliente {
    async CreateCliente(req, res) {
        try {
            const { nome, email, senha } = req.body

            const cliente = await ServiceCliente.CreateCliente(nome, email, senha)
            return res.status(201).send({ cliente: cliente })
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar um cliente ${e.message}` })
        }
    }

    async Login(req, res) {
        try {
            const { email, senha } = req.body

            const token = await ServiceCliente.Login(email, senha)
            return res.status(200).send({ token })
        } catch (e) {
            return res.status(500).send({ msg: e.message })
        }
    }

    async GetClientes(req, res) {
        try {
            const clientes = await ServiceCliente.GetClientes()
            return res.status(200).send({ clientes: clientes })
        } catch (e) {
            return res.status(400).send({ error: `Erro ao procurar os clientes ${e.message}` })
        }
    }

    async UpdateCliente(req, res) {
        try {
            const { id } = req.params
            const { nome, email, senha } = req.body

            const cliente = await ServiceCliente.UpdateCliente(id, nome, email, senha)
            return res.status(201).send({ cliente: cliente })
        } catch (e) {
            return res.status(400).send({ error: `Erro de atualização do cliente ${e.message}` })
        }
    }

    async DeleteCliente(req, res) {
        try {
            const { id } = req.params
            
            await ServiceCliente.DeleteCliente(id)
            return res.status(201).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar o cliente ${e.message}` })
        }
    }
}

module.exports = new ControllerCliente()