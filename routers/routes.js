const express = require("express");
const router =  express.Router();
const {sendOtp, login, signup} = require("../controllers/auth");
const {uploadBlogs, getBlogs, searchBlog, getBlogById} = require("../controllers/addblogs");

// router.get("/sendmail", sendmailyup)
router.post("/sendotp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);
router.post("/addBlog", uploadBlogs)
router.get("/getBlogs/query=:query", getBlogs)
router.get("/searchBlog/query=:query", searchBlog)
router.get("/getBlogById/id=:id", getBlogById)


module.exports = router