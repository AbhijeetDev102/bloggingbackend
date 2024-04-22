const nodemailer = require("nodemailer")

async function mailSender(mail, titile, body){
    // create email transporter
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'ns232280@gmail.com',
            pass:'tsgitjodfcvxolcf'
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