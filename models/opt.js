const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); 

const Opt = sequelize.define('Opt', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, // Validate that the email is in the correct format
    },
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: false, // Default to false, indicating the user has not opted in
  },
}
);

module.exports = Opt;