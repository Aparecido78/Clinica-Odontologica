'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Recepcionista', 'foto');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Recepcionista', 'foto', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
