const Sequelize = require('sequelize');

const sequelize = new Sequelize('node','root','Practicecode',{dialect: 'mysql',host:'localhost'});

module.exports = sequelize;