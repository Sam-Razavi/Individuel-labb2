const {Router} = require("express")
const {getbooks,getbookbyid,addbooks,deletebook,updatebook} = require("./controler")
const router = Router();

router.get("/", getbooks)
router.post("/post", addbooks)
router.get('/get/:id', getbookbyid)
router.put("/update/:id" , updatebook)
router.delete("/delete/:id" , deletebook)


module.exports = router;
