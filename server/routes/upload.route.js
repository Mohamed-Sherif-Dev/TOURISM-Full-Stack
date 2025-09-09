const {Router} = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const uploadImageController = require("../controllers/uploadimage.controller"); 

const uploadRouter = Router();

uploadRouter.post("/upload" , auth, upload.single("image"), uploadImageController);

module.exports = uploadRouter;

