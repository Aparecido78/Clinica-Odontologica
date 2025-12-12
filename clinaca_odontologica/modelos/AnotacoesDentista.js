const {Sequelize} = require("sequelize")
const database = require("../configuracao/config.js")
const FichaClinica = require("./FichaClinica")
const Dentista = require("./Dentista");
const Cliente = require("./Cliente.js");

const AnotacoesDentista = database.define("AnotacoesDentista", {
    exameFisico: Sequelize.TEXT,
    diagnostico: Sequelize.TEXT,
    tratamento: Sequelize.TEXT,
    observacoes: Sequelize.TEXT

});


AnotacoesDentista.belongsTo(FichaClinica); 
FichaClinica.hasOne(AnotacoesDentista);

AnotacoesDentista.belongsTo(Dentista);
Dentista.hasMany(AnotacoesDentista);

Cliente.hasMany(AnotacoesDentista)
AnotacoesDentista.belongsTo(Cliente)

module.exports = AnotacoesDentista;
 

