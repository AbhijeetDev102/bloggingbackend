const mailSender = require("../utils/mailsender");
const mailtemplate = require("../mailTemplates/verificatoinTemplate");
const Otp = require("../models/opt.js");
const User = require("../models/signup.js");
const otpGenerator = require("otp-generator");
const { where } = require("sequelize");

// exports.sendmailyup = async(req,res)=>{
    // try{
    //     console.log("start")
    //     mailSender("mns102720@gmail.com", "me subject hu", mailtemplate(456789) )
    //     console.log("mid send mail")

    //     return res.status(200).json({
    //         seccess:true,
    //     })
    // }catch(error){
    //     console.log(error.message)
    //     res.status(500).json({
    //         message: 'Error while sending',
    //         error:error.message
    //      });
    // }
// }

exports.sendOtp = async (req, res)=>{
  try{

    const {email} = req.body;
    
  //check if user already exist
  const checkUserAlreadyExist = await User.findOne({
    where:{email}
  })

  if(checkUserAlreadyExist){
    return res.status(401).json({
      seccess:false,
      message:"user Already resgistered"
    })
  }

  //generate otp
  var otp = otpGenerator.generate(6, {
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false,
  })

  mailSender(email, "Otp Varificaton mail", mailtemplate(otp) )

  await Otp.create({email, otp})

  res.status(200).json({
    success: true,
    message: "otp send successfully",
  });
  
}catch(err){
  console.log(err.message)
}

}

exports.signup = async (req, res) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
    } = req.body;

    if (
      !userName ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where:{email} });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }







      // Find the most recent OTP for the email
    // const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    // console.log("response is : ", response);
    // try {
    //   if (response.length === 0) {
    //     // OTP not found for the email
    //     return res.status(400).json({
    //       success: false,
    //       message: "The opt is not enter in db",
    //     });
    //   } else if (otp !== response[0].otp) {
    //     // Invalid OTP

    //     return res.status(400).json({
    //       success: false,
    //       message: "The OTP is not valid",
    //     });
    //   }
    // } catch (err) {
    //   return res.status(400).json({
    //     success: false,
    //     message: err.message,
    //   });
    // }

    // return res.status(200).json({
    //     success: true,
    //     user,
    //     message: "User registered successfully",
    //   });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};
