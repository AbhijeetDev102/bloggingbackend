const Sequelize = require("sequelize");
require("dotenv").config()
const dbName = process.env.DB_NAME;
const hostName = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.USER;

const sequelize = new Sequelize(dbName, dbUser,  dbPassword, {
    host: hostName,
    dialect:'mysql',
    logging: false,
    port: process.env.DB_PORT
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;