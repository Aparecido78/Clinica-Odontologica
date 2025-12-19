'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cliente', 'foto');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Cliente', 'foto', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
