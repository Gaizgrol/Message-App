const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize({
    username: "root",
    password: null,
    database: "message_app_development",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
});

module.exports = {
    connection: sequelize,
    getModel: name => require( './models/' + name )( sequelize, Sequelize )
};