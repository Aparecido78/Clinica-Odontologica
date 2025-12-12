const { Sequelize } = require("sequelize");
const database = require("../configuracao/config.js");

const Cliente = require("./Cliente")
const Dentista = require("./Dentista")
const Servico = require("./Servicos") 

const Agendamento = database.define("Agendamento", {
    data: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    hora: {
        type: Sequelize.TIME,
        allowNull: false
    },
    motivo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("agendado", "cancelado", "finalizado"),
        defaultValue: "agendado"
    }
});


Agendamento.belongsTo(Cliente);
Cliente.hasMany(Agendamento);

Agendamento.belongsTo(Dentista);
Dentista.hasMany(Agendamento);

Agendamento.belongsTo(Servico);
Servico.hasMany(Agendamento);



module.exports = Agendamento;
