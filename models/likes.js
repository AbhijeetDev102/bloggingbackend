const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); 

const likes = sequelize.define("blogs", {
    userId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    postId:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = likes;