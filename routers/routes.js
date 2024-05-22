const express = require("express");
const router =  express.Router();
const {sendOtp, login, signup} = require("../controllers/auth");
const {uploadBlogs, getBlogs} = require("../controllers/addblogs");

// router.get("/sendmail", sendmailyup)
router.post("/sendotp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);
router.post("/addBlog", uploadBlogs)
router.get("/getBlogs/query=:query", getBlogs)


module.exports = router