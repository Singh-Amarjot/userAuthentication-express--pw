// importing express 
const express = require("express")
// importing cors
const cors = require("cors")
// importing cookieParser 
const cookie_parser = require("cookie-parser")
// importing router from routes.js
const router = require("./routes/routes.js")

// creating an app server using express 
const app = express()

// setting up middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie_parser())
app.use(cors())
app.use("/",router)


// exporting app module 
module.exports = app