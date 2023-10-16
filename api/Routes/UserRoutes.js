
import express from "express"
import { deleleduser, getUser, getuserlisting, updateUser} from "../Controllers/UserController.js"
import { verifyToken } from "../Utilis/Token.js"




const roter = express.Router()


roter.post('/update/:id', verifyToken, updateUser)
roter.delete('/delete/:id', verifyToken, deleleduser)
roter.get('/listing/:id', verifyToken, getuserlisting)
roter.get('/:id', verifyToken, getUser)



export default roter