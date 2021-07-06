module.exports = (sequelize, DataTypes) => {
  const ExamResult = sequelize.define('exam_results', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      marks: {
        allowNull: false,
        type: DataTypes.STRING
      },
     examId: {
         type: DataTypes.INTEGER,
         allowNull: false
     },
     studentId: {
         type: DataTypes.INTEGER,
         allowNull: false
     },
     courseId: {
         type: DataTypes.INTEGER,
         allowNull: false
     },
  }, {timestamps: false});

  ExamResult.associate = (models) => {
    ExamResult.belongsTo(models.Exam, {
      foreignKey: 'examId'
    })
    ExamResult.belongsTo(models.Student, {
      foreignKey: 'studentId'
    })
    ExamResult.belongsTo(models.Course, {
      foreignKey: 'courseId'
    })
  };

  return ExamResult;
};