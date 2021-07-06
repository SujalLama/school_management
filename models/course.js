module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('courses', {
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
     description: {
      type: DataTypes.STRING
     },
     gradeId: {
         type: DataTypes.INTEGER,
         allowNull: false
     }
  }, {timestamps: false});

  Course.associate = (models) => {
    Course.belongsTo(models.Grade, {
      foreignKey: 'gradeId'
    })
  };

  return Course;
};