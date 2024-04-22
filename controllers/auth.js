const mailSender = require("../utils/mailsender")
const mailtemplate = require("../mailTemplates/verificatoinTemplate")

exports.sendmailyup = async(req,res)=>{
    try{
        console.log("start")
        mailSender("mns102720@gmail.com", "me subject hu", mailtemplate(456789) )
        console.log("mid send mail")
        
        return res.status(200).json({
            seccess:true,
        })
    }catch(error){
        console.log(err.message)
        res.status(500).json({ 
            message: 'Error while sending',
            error:error.message
         });
    }
}