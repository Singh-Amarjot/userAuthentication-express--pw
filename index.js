// importing app from app.js
const app = require("./app.js")
// importing and configuring dotenv 
const dotenv = require("dotenv").config()
//imporing and running the dbConnect() from dbConnect.js
const dbConnect = require("./config/dbConnect.js")
dbConnect()


const port = process.env.PORT || 5500

// starting the server 
app.listen(port,()=>{
    console.log("SERVER IS LISTENING ON PORT ",port )
})