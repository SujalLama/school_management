'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exams', { 
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
     start_date: {
      type: Sequelize.DATE,
      allowNull: false
     },
     examTypeId: {
       type: Sequelize.INTEGER,
       references: {
         model: 'exam_types',
         key: 'id'
       }
     }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exams');
  }
};
