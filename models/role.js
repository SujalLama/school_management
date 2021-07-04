module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    role: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {timestamps: false});
  
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'roleId'
    })
  };

  return Role;
};