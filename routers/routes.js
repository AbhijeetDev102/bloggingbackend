const express = require("express")
const router =  express.Router()
const {sendmailyup} = require("../controllers/auth")

router.get("/sendmail", sendmailyup)

module.exports = router