const express = require("express")
const router =  express.Router()
// const {sendmailyup} = require("../controllers/auth")
// const {sendOtpData} = require("../controllers/auth")
const {sendOtp} = require("../controllers/auth")

// router.get("/sendmail", sendmailyup)
router.post("/sendotp", sendOtp)


module.exports = router