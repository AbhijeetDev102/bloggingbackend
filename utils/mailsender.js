const nodemailer = require("nodemailer")
require("dotenv").config()

async function mailSender(mail, titile, body){
    // create email transporter
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MAIL_EMAIL,
            pass:process.env.MAIL_PASS
        }
    })

    //configure email content.

    const mailOption = {
        from:"naveen@gmail.com",
        to:mail,
        subject:titile,
        html:body
    }

    // send email 

    try{
        const result = await transporter.sendMail(mailOption)
        console.log("email send successfully");
    }catch(err){
        console.log("mail not send");
    }

}

module.exports = mailSender