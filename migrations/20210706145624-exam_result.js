'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exam_results', { 
      id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
     marks: {
      allowNull: false,
      type: Sequelize.STRING
     },
     examId: {
       type: Sequelize.INTEGER,
       references: {
         model: 'exams',
         key: 'id'
       }
     },
     courseId: {
       type: Sequelize.INTEGER,
       references: {
         model: 'courses',
         key: 'id'
       }
     },
     studentId: {
       type: Sequelize.INTEGER,
       references: {
         model: 'students',
         key: 'id'
       }
     }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exam_results');
  }
};
