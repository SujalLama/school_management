'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classrooms', { 
      id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
     year: {
       allowNull: false,
      type: Sequelize.STRING
     },
     section: {
      type: Sequelize.STRING
     },
     status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
     },
     remarks: {
       type: Sequelize.STRING
     },
      teacherId: {
        type: Sequelize.INTEGER,
        references: {
        model: 'teachers',
        key: 'id'
      }
      },
    createdAt: {
        type: Sequelize.DATE
      },
    updatedAt: {
            type: Sequelize.DATE
        }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('classrooms');
  }
};
