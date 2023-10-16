import express from "express"
import { google, sigin, signup ,signout} from "../Controllers/AitjenticationController.js"
import { verifyToken } from "../Utilis/Token.js"

const roter = express.Router()


roter.post("/signup" , signup)
roter.post("/sigin" ,sigin )
roter.post("/google" ,google)
roter.get("/signou" ,signout)


export default roter


"652cf80f814e74f1d9ca46d3"