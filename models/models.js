// importing mongoose
const mongoose = require("mongoose")
// importing bcrypt 
const bcrpt = require("bcrypt")
// importing JWT
const JWT = require("jsonwebtoken")
// building  userschema using mongoose
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            trim: [true]
        },
        email: {
            type: String,
            required: [true, "email is required"],
            lowercase: [true],
            unique: [true, "email address needs to be unique"]
        },
        password: {
            type: String,
            select: false,
            bcrpt:true
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordExpiryDate: {
            type: Date
        }

    },
    {
        timestamps: true
    }

)
// adding a custom method to generate jwt token
userSchema.methods={

    jwtToken(){
        return JWT.sign(
            {
                id: this.id,
                email: this.email
            },
            process.env.SECRET_KEY,
            {
                expiresIn:"24h"
            }
        )
    }
}

// implementing hashing on the password before creating an instance of user 
userSchema.pre("save",async function(next){
    let user = this 
 if(!user.isModified('password')){
    return next()
 }
 
 bcrpt.hash(this.password, 10, (err, hash) => {
    if (err) {
      console.log("something went wrong for hashing");
    }
    if (hash) {
      user.password = hash;
      console.log(user.password)
    }
  });
});

    
    


// creating userModel
const userModel = mongoose.model("user", userSchema)

// exporting userModel
module.exports = userModel