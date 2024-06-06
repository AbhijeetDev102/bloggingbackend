const express = require("express");
const app = express();
const sequelize = require("./Config/dbConnect");
require("dotenv").config();
const cors = require("cors");
const router = require("./routers/routes");
const cloudinary = require("./Config/cloudinary");
const fileUpload = require("express-fileupload");
cloudinary.cloudinaryConnect();
//middlewares
app.use(express.json());
app.use(cors())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
})) 
app.use('/api/v1', router)
app.use("", async(req,res)=>{
    res.send("hellow")
})
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