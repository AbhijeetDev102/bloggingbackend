const express = require("express");
const app = express()
const cors = require("cors")
require("dotenv").config()
require("./Config/dbConnect")
const router = require("./routers/routes")
const sequelize = require("./Config/dbConnect")

//middlewares
app.use(express.json());
app.use(cors)
app.use('/api/v1', router)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`app is running of port number ${port}`)
})

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull")
    }).catch((err)=>{
        throw err
    })