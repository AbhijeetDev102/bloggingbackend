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
  await Otp.create({email, otp})

  await mailSender(email, "Otp Varificaton mail", mailtemplate(otp) )

  res.status(200).json({
    success: true,
    message: "otp send successfully",
    otp
  });
  
}catch(err){
  console.log(err.message)
  res.status(500).json({
    success: true,
    message:err.message,
  });
}

}

exports.signup = async (req, res, otp) => {
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
      const response = await Otp.findOne({
        where: { email },
        attributes: ['otp'], 
      });

      let otpData = null
      if(response){
        otpData = response.otp.toString();
        console.log("response is : ", response);
      }

      if(otpData == otp){
        console.log("mja a gya yarrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
              // Create the user
              const user = await User.create({
                userName,
                firstName,
                lastName,
                email,
                password: hashedPassword,
                confirmPassword: hashedPassword,
                approve:true
            });
            return res.status(200).json({
              success: true,
              user,
              message: "User registered successfully",
            });
      }else{
        console.log("mja nhi aya yarrrrrrrrrrrrrrrrrrrr")
        return res.status(500).json({
          success: false,
          message: "otp not matched",
        });
      }

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};
