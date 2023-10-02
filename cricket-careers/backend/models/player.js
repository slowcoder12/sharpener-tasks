const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Player = sequelize.define('players',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:Sequelize.STRING,
    dob:Sequelize.TEXT,
    photourl: Sequelize.STRING,
    birthplace: Sequelize.STRING,
    career: Sequelize.TEXT,
    matches:Sequelize.INTEGER,
    score:Sequelize.INTEGER,
    fifties:Sequelize.INTEGER,
    centuries:Sequelize.INTEGER,
    wickets:Sequelize.INTEGER,
    average:Sequelize.INTEGER,

});

module.exports = Player;