
import  express from "express";
import { delletdlisting,     getListing,     getListings,     listning, updateListing, } from "../Controllers/listingControoler.js";
import { verifyToken } from "../Utilis/Token.js"

const router = express.Router()


router.post("/create" ,verifyToken, listning)
router.delete("/delletd/:id" ,verifyToken, delletdlisting)

router.put('/update/:id', verifyToken, updateListing);

router.get('/get/:id', verifyToken, getListing);

router.get('/all', getListings);






export default router




   ""