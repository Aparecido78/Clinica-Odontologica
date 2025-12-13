const Sequelize = require("sequelize");
const database = require("../configuracao/config");

const Admin = database.define("Admin", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  foto: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: true  
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: true
  },
  data_nascimento: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  sexo: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Admin;
