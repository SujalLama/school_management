'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendances', { 
      id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
     date: {
       allowNull: false,
      type: Sequelize.DATE
     },
     status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
     },
     remarks: {
       type: Sequelize.STRING
     },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
        model: 'students',
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
    await queryInterface.dropTable('attendances');
  }
};
