'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('FichaClinica', 'Cáries', 'caries');
    await queryInterface.renameColumn('FichaClinica', 'Restaurações', 'restauracoes');
    await queryInterface.renameColumn('FichaClinica', 'Próteses', 'proteses');
    await queryInterface.renameColumn('FichaClinica', 'Hábitos', 'habitos');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('FichaClinica', 'caries', 'Cáries');
    await queryInterface.renameColumn('FichaClinica', 'restauracoes', 'Restaurações');
    await queryInterface.renameColumn('FichaClinica', 'proteses', 'Próteses');
    await queryInterface.renameColumn('FichaClinica', 'habitos', 'Hábitos');
  }
};
