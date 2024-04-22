const express = require("express");
const app = express()
const cors = require("cors")
require("dotenv").config()
require("./Config/dbConnect")
const router = require("./routers/routes")
const sequelize = require("./Config/dbConnect")

//middlewares
app.use(cors)
app.use(express.json());

const port = process.env.PORT

app.use('/api/v1', router)


//defalult routes
app.get('/', (req, res)=>{
    res.send("hello world this is home page")
})

app.listen(port, ()=>{
    console.log(`app is running of port number ${port}`)
})

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull")
    }).catch((err)=>{
        throw err
    })