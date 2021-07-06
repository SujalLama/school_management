module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('attendances', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
     date: {
       allowNull: false,
      type: DataTypes.DATE
     },
     remarks: {
       type: DataTypes.STRING
     },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    studentId: {
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

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.Student, {
      foreignKey: 'studentId'
    })
  };

  return Attendance;
};