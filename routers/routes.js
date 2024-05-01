const express = require("express")
const router =  express.Router()
const {sendOtp, login, signup} = require("../controllers/auth")

// router.get("/sendmail", sendmailyup)
router.post("/sendotp", sendOtp)
router.post("/signup", signup)
router.post("/login", login)


module.exports = router