const Sequelize = require("sequelize")
const database = require("../configuracao/config");
const Admin  = database.define("Admin",{
    
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
    foto:{
        type: Sequelize.STRING
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


module.exports = Admin


