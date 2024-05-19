const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); 

const blogs = sequelize.define("blogs", {
    blogImage:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }

});

module.exports = blogs;