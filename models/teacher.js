module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teachers', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          len: [9]
        }
      },
      mobile: {
        type: DataTypes.STRING,
        validate: {
          len: [10]
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
  });

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.User, {
      foreignKey: 'userId'
    })
   
  };

  return Teacher;
};