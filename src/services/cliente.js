const ModelCliente = require('./../models/cliente')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretKey = 'Security-Verification'
const salt = 12

class ServiceCliente {
    async CreateCliente(nome, email, senha) {
        if (!nome || !email || !senha) {
            throw new Error('Preencha todos os campos!')
        }

        const hashSenha = await bcrypt.hash(senha, salt)

        return await ModelCliente.create({
            nome,
            email,
            senha: hashSenha
        })
    }

    async Login(email, senha) {
        if (!email || !senha) {
            throw new Error('Preencha todos os campos!')
        }

        const cliente = await ModelCliente.findOne({ where: { email } })

        if (!cliente) {
            throw new Error('Email ou senha inválidos!')
        }

        const senhaValida = bcrypt.compare(senha, cliente.senha)

        if (!senhaValida) {
            throw new Error('Email ou senha inválidos!')
        }

        return jwt.sign({ id: cliente.id }, secretKey, { expiresIn: 60 * 60 })
    }

    async GetClientes() {
        const clientes = await ModelCliente.findAll()
        return clientes
    }

    async UpdateCliente(id, nome, email, senha) {
        if (!id) {
            throw new Error('Favor informar o ID!')
        }

        const cliente = await ModelCliente.findByPk(id)
        if (!cliente) {
            throw new Error('Cliente não encontrado!')
        }

        cliente.nome = nome || cliente.nome
        cliente.email = email || cliente.email
        cliente.senha = senha ? await bcrypt.hash(senha, salt) : cliente.senha

        cliente.save()
        return cliente
    }

    async DeleteCliente(id) {
        if (!id) {
            throw new Error('Favor informa o ID!')
        }

        const cliente = await ModelCliente.findByPk(id)
        if (!cliente) {
            throw new Error("Cliente não encontrado!");
        }

        cliente.nome = 'Cliente deletado'
        cliente.email = 'Cliente deletado'
        cliente.senha = 'Cliente deletado'
        cliente.save()

        return cliente
    }
}

module.exports = new ServiceCliente()