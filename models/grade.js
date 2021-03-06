module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('grades', {
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

  Grade.associate = (models) => {
    Grade.hasMany(models.Classroom, {
      foreignKey: 'gradeId'
    })
    Grade.hasMany(models.Course, {
      foreignKey: 'gradeId'
    })
  };

  return Grade;
};