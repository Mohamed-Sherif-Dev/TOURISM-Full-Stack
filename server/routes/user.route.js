const { Router } = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer.js");
const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() });
// const upload = require("../middleware/multer")
const {
  registerUserController,
  verifyEmailController,
  loginController,
  logoutController,
  uploadAvater,
  updateUserDetails,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetpassword,
  refreshtoken,
  userDetails,
} = require("../controllers/user.controller");


const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify_email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.get("/logout",auth, logoutController);
userRouter.put("/upload-avatar",auth,upload.single("avatar"),uploadAvater);
userRouter.put("/update-user" , auth ,updateUserDetails )
userRouter.put("/forgot-password" , forgotPasswordController )
userRouter.put("/verify-forgot-password-otp" ,verifyForgotPasswordOtp)
userRouter.put("/reset-password" ,resetpassword )
userRouter.get("/refresh-token" , refreshtoken) // New route for refreshing token
userRouter.get("/user-details", auth, userDetails); // New route for getting user details
module.exports = userRouter;
