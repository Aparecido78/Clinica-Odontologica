'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('dentista', 'foto');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('dentista', 'foto', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
