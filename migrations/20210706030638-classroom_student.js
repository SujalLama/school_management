'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classroom_students', { 
      id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
     classroomId: {
       type: Sequelize.INTEGER,
       references: {
         model: 'classrooms',
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
    await queryInterface.dropTable('classroom_students');
  }
};
