'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', { 
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
     description: {
      type: Sequelize.STRING
     },
     gradeId: {
       type: Sequelize.INTEGER,
       references: {
         model: 'grades',
         key: 'id'
       }
     }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('courses');
  }
};
