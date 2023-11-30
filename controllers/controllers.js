// importing userModel from models.js
const User = require("../models/models.js")
// importing bcrypt 
const bcrypt = require("bcrypt")
// importing email validator 
const email_validator = require("email_validator")
// creating controllers for the request handling \
exports.signup = async (req,res)=>{
    // extracting credentials from body 
    const {name,email,password,confirmPassword}=req.body


   
    // creating user from credentials
try{
     // performing all the validations 
     if(!name || !email || !password || !confirmPassword){
        throw new Error("please fill in all the fields")
    }
    if(password!=confirmPassword){
        throw new Error("password did not match with confirm password")
    }
    const isValid = email_validator.validate(email)
    if(!isValid){
        throw new Error("the provided email id is not valid ")
    }
    const emailExists = await User.findOne({email})
    if(emailExists){
        throw new Error("a user already exists with the provided email id please enter another email address")
    }

    const newUser =  await new User({name,email,password})
     await newUser.save()
    res.status(200).json({
        success:true,
        message:"signup successful",
        newUser
    })
}catch(error){
    res.status(400).json({
        success:false,
        message:"signup failed",
        error:error.message
    })
}
    

}
exports.signin = async (req,res)=>{
    // extracting info from the body 
    const{email,password} = req.body

    // handling signin request 
    try{
        //adding validations 
        if(!email || !password){
            throw new Error("please fill in all the fields")
        }
        const user = await User.findOne({email}).select("+password")
        if(!user || !bcrypt.compare(password,user.password)     ){
            throw new Error("invalid credentials")
        }
        
        
        //generating token 
        const token = user.jwtToken()
        user.password=undefined;

        // creating and sending cookie with token
        const cookieOptions = {
            maxAge:24*60*60*1000,
            httpOnly:true
        }

        res.cookie("token",token,cookieOptions)

        res.status(200).json({
            success:true,
            message:`sign in successful, welcome ${user.name}`,
            userinfo:user
        })
    }catch(error){
        res.status(400).json({
            success:"false",
            error:error.message
        })
    }
}

exports.userinfo = async (req,res) =>{

    // extracting user info from token 
    const {id,email} = req.user
    
    
try{
 // finding user by id and sending the iuserinfo as response 
 const user = await User.findById(id)

 res.status(200).json({
    success:true,
    message:"user found ",
    user
 })
}catch(error){
    res.status(400).json({
        success:false,
        message:error.message
    })
}
   

}

exports.logout = (req,res) =>{

    try{
        res.cookie("token",null)
        res.status(200).json({
            success:true,
            message:"logout succesfull"
        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })

    }
}