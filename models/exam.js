module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('exams', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
     name: {
       allowNull: false,
      type: DataTypes.STRING
     },
     start_date: {
      type: DataTypes.DATE,
      allowNull: false
     },
     examTypeId: {
         type: DataTypes.INTEGER,
         allowNull: false
     }
  }, {timestamps: false});

  Exam.associate = (models) => {
    Exam.belongsTo(models.ExamType, {
      foreignKey: 'examTypeId'
    })

    Exam.belongsToMany(models.Student, {
        foreignKey: 'examId',
        through: 'exam_results'
    })

    Exam.belongsToMany(models.Course, {
        foreignKey: 'examId',
        through: 'exam_results'
    })
  };

  return Exam;
};