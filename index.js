const express = require("express");
const app = express()
const sequelize = require("./Config/dbConnect")
require("dotenv").config()
const cors = require("cors")
const router = require("./routers/routes")

//middlewares
app.use(express.json());
app.use(cors())
app.use('/api/v1', router)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`app is running of port number ${port}`)
})

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull")
    }).catch((err)=>{
        throw err
    })