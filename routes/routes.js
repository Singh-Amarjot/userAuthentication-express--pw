// importing express 
const express = require("express")
// importing middlewares from middlewares.js
const {isValid} =require("../middleWares/jwtAuth.js")
// importing controllers from controllers.js
const {signin, signup,userinfo, logout}=require("../controllers/controllers.js")

// creating a router 
const router = express.Router()

// handling routes 
router.post("/signup",signup)
router.post("/signin",signin)
router.get("/userinfo",isValid,userinfo)
router.post("/logout",isValid,logout)

// exporting router
module.exports = router;