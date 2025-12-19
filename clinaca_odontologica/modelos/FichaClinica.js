const { Sequelize } = require("sequelize");
const database = require("../configuracao/config.js");


const Cliente = require("./Cliente");
const FichaClinica = database.define("FichaClinica", {

    alergias: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    medicamentosUsoContinuo: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    doencasPreExistentes: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    historicoFamiliar: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    cirurgiasAnteriores: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    queixas: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    pressaoArterial: {
        type: Sequelize.STRING,      
        allowNull: true
    },

    frequenciaCardiaca: {
        type: Sequelize.INTEGER,     
        allowNull: true
    },

    peso: {
        type: Sequelize.FLOAT,       
        allowNull: true
    },

    altura: {
        type: Sequelize.FLOAT,       
        allowNull: true
    },

   
    higieneBucal: {         
        type: Sequelize.STRING,
        allowNull: true
    },

    caries: {               
        type: Sequelize.TEXT,
        allowNull: true
    },

    gengivaInflamada: {      
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    sensibilidadeDentes: {    
        type: Sequelize.TEXT,
        allowNull: true
    },

    restauracoes: {         
        type: Sequelize.TEXT,
        allowNull: true
    },

    dentesAusentes: {        
        type: Sequelize.TEXT,
        allowNull: true
    },

    proteses: {               
        type: Sequelize.STRING,
        allowNull: true
    },

    bruxismo: {               
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    tratamentoOrtodontico: {  
        type: Sequelize.STRING,
        allowNull: true
    },

    habitos: {                
        type: Sequelize.TEXT,
        allowNull: true
    },

    exameOralGeral: {         
        type: Sequelize.TEXT,
        allowNull: true
    },

    radiografiasRecentes: {   
        type: Sequelize.TEXT,
        allowNull: true
    },

    observacoesExtras: {     
        type: Sequelize.TEXT,
        allowNull: true
    }

});


FichaClinica.belongsTo(Cliente);
Cliente.hasMany(FichaClinica);





module.exports = FichaClinica;
