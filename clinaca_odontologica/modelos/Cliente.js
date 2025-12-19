const Sequelize = require("sequelize")
const database = require("../configuracao/config");
const Cliente = database.define("Cliente",{
    
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    sexo:{
        type: Sequelize.STRING,
        allowNull: false
    }


})



module.exports = Cliente



