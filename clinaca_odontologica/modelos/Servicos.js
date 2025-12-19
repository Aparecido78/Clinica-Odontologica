const { Sequelize } = require("sequelize");
const database = require("../configuracao/config.js");

const Servico = database.define("Servico", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    duracao: { 
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    valor: {
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: true
    },
    foto:{
        type:Sequelize.STRING,
        allowNull:false
    }
});


module.exports = Servico;
