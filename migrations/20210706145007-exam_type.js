'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exam_types', { 
      id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
     name: {
       allowNull: false,
      type: Sequelize.STRING
     },
     desc: {
      type: Sequelize.STRING
     },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exam_types');
  }
};
