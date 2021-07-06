module.exports = (sequelize, DataTypes) => {
  const ExamType = sequelize.define('exam_types', {
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
     desc: {
      type: DataTypes.STRING
     }
  }, {timestamps: false});

  ExamType.associate = (models) => {
    ExamType.hasMany(models.Exam, {
      foreignKey: 'examTypeId'
    })
  };

  return ExamType;
};