'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config');
// const config = require(path.join(__dirname, '/../config/config.json'))[env]
// const db = {};

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: 'postgres'
});

const db = {
  User: require('./user')(sequelize, Sequelize.DataTypes),
  Role: require('./role')(sequelize, Sequelize.DataTypes),
  Parent: require('./parent')(sequelize, Sequelize.DataTypes),
  Student: require('./student')(sequelize, Sequelize.DataTypes),
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
