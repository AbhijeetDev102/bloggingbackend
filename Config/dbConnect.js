const Sequelize = require("sequelize");
require("dotenv").config()
const dbName = process.env.DB_NAME;
const hostName = process.env.HOST_NAME;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, hostName, dbPassword, {
    host: process.env.HOST,
    dialect:'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;