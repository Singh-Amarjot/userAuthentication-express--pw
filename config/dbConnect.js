// importing mongoose
const mongoose = require("mongoose")

// setting up database connection

async function dbConnect(){

     mongoose.connect(process.env.DB_CONNECTION_STRING).then(()=>{
         console.log("database connected successfully")
    }).catch((error)=>{
        console.log("database connection failed due to error ",error.message)
    })
        
    
}
  
// eporting dbConnect 
module.exports = dbConnect;
