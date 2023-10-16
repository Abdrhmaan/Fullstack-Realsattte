
import express  from "express";
import mongoose from "mongoose";
const app = express()
import doteev from "dotenv"
import Authentication from "./Routes/Authentication.js"
import Userrouter from "./Routes/UserRoutes.js"
import Listingrouter from "./Routes/ListungRoutes.js"
import cookieParser from "cookie-parser";

doteev.config(),

mongoose.connect(process.env.MONGODB)
.then((res) => 
console.log("coonected databse"))
.catch((e) => {
    console.log("no connected" ,e)
})



app.use(express.json())
app.use(cookieParser())








app.listen(9000 , (req,res) => {
    console.log("eunning swerver 9000")
})

app.use("/api/authentcation" , Authentication)
app.use("/api/user" , Userrouter)
app.use("/api/listing" , Listingrouter)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
