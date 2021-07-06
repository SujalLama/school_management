module.exports = (sequelize, DataTypes) => {
  const Classroom = sequelize.define('classrooms', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
     year: {
       allowNull: false,
      type: DataTypes.STRING
     },
     section: {
      type: DataTypes.STRING
     },
     remarks: {
       type: DataTypes.STRING
     },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gradeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  Classroom.associate = (models) => {
    Classroom.belongsTo(models.Teacher, {
      foreignKey: 'teacherId'
    })
   
    Classroom.belongsTo(models.Grade, {
      foreignKey: 'gradeId'
    })

    Classroom.belongsToMany(models.Student, {
      foreignKey: 'classroomId',
      through: 'classroom_students'
    })
  };

  return Classroom;
};