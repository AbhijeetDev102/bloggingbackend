const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); 

const comments = sequelize.define("blogs", {
    userId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    postId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    comment:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = comments;