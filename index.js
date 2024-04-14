const express = require("express");
const app = express()
const cors = require("cors")
require("dotenv").config()

//middle wares
app.use(cors)
app.use(express.json());



const port = process.env.PORT

//defalult routes
app.get('/', (req, res)=>{
    res.send("hello world this is home page")
})

app.listen(port, ()=>{
    console.log(`app is running of port number ${port}`)
})
