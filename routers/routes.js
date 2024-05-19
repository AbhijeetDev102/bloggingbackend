const express = require("express");
const router =  express.Router();
const {sendOtp, login, signup} = require("../controllers/auth");
const {uploadBlogs} = require("../controllers/addblogs");

// router.get("/sendmail", sendmailyup)
router.post("/sendotp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);
router.post("/addBlog", uploadBlogs)


module.exports = router