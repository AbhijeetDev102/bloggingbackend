const {DataTypes} = require("sequelize");
const sequelize = require("../Config/dbConnect");

const User = sequelize.define('userSignUp', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull:true
    },
    approve:{
      type:DataTypes.BOOLEAN,
      allowNull:false
    }
  });
  
  module.exports = User;