const mailSender = require("../utils/mailsender");
const mailtemplate = require("../mailTemplates/verificatoinTemplate");
const Otp = require("../models/opt.js");
const User = require("../models/signup.js");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { response } = require("express");
const { where } = require("sequelize");

exports.sendOtp = async (req, res)=>{
  try{

    const {email} = req.body;
    
  //check if user already exist
  const checkUserAlreadyExist = await User.findOne({
    where:{email}
  })
  const otpAlreadyExist = await Otp.findOne({
    where:{email}
  })

  if(checkUserAlreadyExist){
    return res.status(401).json({
      seccess:false,
      message:"user Already resgistered"
    })
  }

  if(otpAlreadyExist){
    let presentOtp = await Otp.destroy({
      where:{email}
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
  res.status(500).json({
    success: true,
    message:err.message,
  });
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

    console.log("yup man")

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
      //check userName already exist or not
      const userNameuserExist = await User.findOne({
          where:{
              userName
          }
      })
      if(userNameuserExist){
          return res.status(400).json({
              success:false,
              message:"userName already exist"
          })
      }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

      // Find the most recent OTP for the email
    const response = await Otp.findOne({where:{email} })
    console.log("response is : ", response);



            // Create the user
      //   const user = await User.create({
      //     userName,
      //     firstName,
      //     lastName,
      //     email,
      //     password: hashedPassword,
      //     confirmPassword: hashedPassword,
      //     otp,
      //     approve:true
      // });

    return res.status(200).json({
        success: true,
        // user,
        message: "User registered successfully",
        response
      });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
      res:response.otp
    });
  }
};
