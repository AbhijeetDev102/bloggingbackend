const express = require("express")
const router =  express.Router()
// const {sendmailyup} = require("../controllers/auth")
// const {sendOtpData} = require("../controllers/auth")
const {sendOtp} = require("../controllers/auth")
const {signup} = require("../controllers/auth")

// router.get("/sendmail", sendmailyup)
router.post("/sendotp", sendOtp)
router.post("/signup", signup)


module.exports = router