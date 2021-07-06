module.exports = (sequelize, DataTypes) => {
  const ClassroomStudent = sequelize.define('classroom_students', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    classroomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {timestamps: false});

//   ClassroomStudent.associate = (models) => {
//     ClassroomStudent.belongsTo(models.Classroom, {
//       foreignKey: 'classroomId'
//     })
   
//     ClassroomStudent.belongsTo(models.Student, {
//       foreignKey: 'studentId'
//     })
//   };

  return ClassroomStudent;
};