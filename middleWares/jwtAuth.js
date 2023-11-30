//importing jwt
const jwt = require("jsonwebtoken")
// creating middleware to validate the token
exports.isValid = (req,res,next)=>{
    if(!req.cookies){
        res.status(400).json({
            success:false,
            message:"cookies do not exist "
        })
    }
        const token = req.cookies.token 
        if(!token){
            res.status(400).json({
                seccess:false,
                message:"not authorized"
            })
        }
        try{
            // verifying token and extracting info
            const payload = jwt.verify(token,process.env.SECRET_KEY)
           
            // passing payload info to next stage via req obj 
            req.user = {
                id:payload.id,
                email:payload.email
            }
        } catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
    
    next()
    
}