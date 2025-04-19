const express = require("express");
const router = express.Router();

const { registerNgo } = require("../controllers/ngoController");
const {getAllNgos} = require("../controllers/ngoController");
const {deleteNgo}=require("../controllers/ngoController");
const {approveNgo}=require("../controllers/ngoController");
const upload = require("../middlewares/upload"); // or wherever you defined multer

router.post("/register", upload.single("registrationDoc"), registerNgo);
router.get("/all",getAllNgos);

router.delete("/:id",deleteNgo)

router.patch("/approve/:id", approveNgo);

module.exports = router;
