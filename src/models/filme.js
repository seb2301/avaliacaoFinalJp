const database = require('../config/database')

class ModelFilme {
    constructor() {
        this.model = database.db.define('filmes', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            titulo: {
                type: database.db.Sequelize.STRING
            },

            classificacaoIndicativa: {
                type: database.db.Sequelize.INTEGER
            },

            diretor: {
                type: database.db.Sequelize.STRING
            }
        })
    }
}

module.exports = new ModelFilme().model