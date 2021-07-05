module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
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
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: false
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

  Student.associate = (models) => {
    Student.belongsTo(models.User, {
      foreignKey: 'userId'
    })

    Student.belongsTo(models.Parent, {
        foreignKey: 'parentId'
    })
   
  };

  return Student;
};