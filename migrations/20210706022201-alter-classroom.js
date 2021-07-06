'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('classrooms', 'gradeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'grades',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('classrooms', 'gradeId')
  }
};
