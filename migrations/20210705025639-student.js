'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', { 
      id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      fname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE
      },
      date_of_join: Sequelize.DATE,
      phone: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
        model: 'users',
        key: 'id'
      }
      },
      parentId: {
        type: Sequelize.INTEGER,
        references: {
        model: 'parents',
        key: 'id'
      }
      },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students');
  }
};
