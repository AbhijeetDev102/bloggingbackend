const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); 

const Opt = sequelize.define('Otp', {
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}
);

module.exports = Opt;