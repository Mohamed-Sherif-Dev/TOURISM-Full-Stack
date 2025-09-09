const UserModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/sendEmail");
const generateAccessToken = require("../utils/generatedAccessToken ");
const genertedRefreshToken = require("../utils/genertedRefreshToken");
const uploadImageClodinary = require("../utils/uploadImageClodinary");
const generatedOtp  = require("../utils/generatedOtp")
const forgotPasswordTemplate = require("../utils/forgotPasswordTemplate")
// REGISTER USER
// === CONTROLLER ===
const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email, name and password",
        error: true,
        success: false,
      });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({
        message: "Email already registered, please login",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const payload = { name, email, password: hashedPassword };
    const newUser = new UserModel(payload);
    const savedUser = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;

    await sendEmail({
      sendTo: email,
      subject: "Verify your email",
      text: `Please verify your email by clicking the following link: ${verifyEmailUrl}`,
      html: `<p>Please verify your email by clicking: <a href="${verifyEmailUrl}">Verify Email</a></p>`,
    });

    const { password: _pw, ...userData } = savedUser.toObject();

    return res.status(201).json({
      message: "User registered successfully",
      user: userData,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false,
    });
  }
};

// === CONTROLLER ===
// verify email
const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({ _id: code });
    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    );

    return res.json({
      message: "verify email successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// === CONTROLLER ===
// login user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Provide email and password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email }).select("+password")
    if (!user) {
      return res.status(400).json({
        message: "User not found, please register",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Your account is not active, please contact admin",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await genertedRefreshToken(user._id);
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//logout user controller
const logoutController = async (req, res) => {
  try {
    const userId = req.userId; //middleware auth
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: refreshtoken,
    });

    return res.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//upload avtar controller
const uploadAvater = async (req , res)=>{
    try {
        const userId = req.userId; //middleware auth
        const image = req.file; //middleware multer

        const upload = await uploadImageClodinary(image);

        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url,

        })

        return res.json({
            message: "Upload avtar successfully Profile",
            error: false,
            success: true,
            data :{
               avatar: upload.url,
                _id : userId
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

//Upadute user detai=>{
// ls
const updateUserDetails = async (req , res)=>{
    try {
        const userId = req.user?.id || req.userId; //auth middleware
        const {name , email , mobile , password} = req.body;

        let hashedPassword = "";
        if(password){
            const salt = await bcryptjs.genSalt(10);
            hashedPassword = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne(
            {_id : userId},
            {
                ...(name && {name : name}),
                ...(email && {email : email}),
                ...(mobile && {mobile : mobile}),
                ...(password && {password : hashedPassword})
            }
        );
        return res.json({
            message: "Updated successfully",
            error : false,
            success : true,
            data : updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

const forgotPasswordController = async (req , res)=>{
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "User not found Enter valid email",
                error : true,
                success : false
            })
        }

        const otp = generatedOtp();
        const expireTime = Date.now() + 10 * 60 * 1000; //10 mins

        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_otp_expiry : new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo : email,
            subject : "Your password reset OTP",
            text : `Your password reset OTP is ${otp}. It will expire in 10 minutes.`,
            html : forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return res.json({
            message : "OTP sent to your email",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// verify forgot password otp controller
const verifyForgotPasswordOtp = async (req , res)=>{
  try {
    const {email , otp } = req.body;
    if(!email || !otp){
        return res.status(400).json({
            message : "Provide email and otp",
            error : true,
            success : false
        })
    }

    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(400).json({
            message : "User not found emter valid email",
            error : true,
            success : false
        })
    }
    
    const currentTim = new Date().toISOString();

    if(user.forgot_password_otp_expiry < currentTim){
        return res.status(400).json({
            message : "OTP expired , please try again",
            error : true,
            success : false
        })
    }

      if(otp !== user.forgot_password_otp){
        return res.status(400).json({
            message : "Invalid OTP , please try again",
            error : true,
            success : false
        })
      }

      const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
        forgot_password_otp : "",
        forgot_password_otp_expiry : ""
      })

      return res.json({
        message : "OTP verified successfully",
        error : false,
        success : true
      })
  } catch (error) {
    return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
  }
}

// reset the password
const resetpassword = async (req , res)=>{
  try {
    const {email , newPassword , confirmPassword} = req.body;
    if(!email || !newPassword || !confirmPassword){
      return res.status(400).json({
        message : "Provide email , new password and confirm password",
        error : true,
        success : false
      })
    }

    const user = await UserModel.findOne({email});
    if(!user){
      return res.status(400).json({
        message : "User not found , enter valid email",
        error : true,
        success : false
      })
    }

    if(newPassword !== confirmPassword){
      return res.status(400).json({
        message : "New password and confirm password do not match",
        error : true,
        success : false
      })
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    const update = await UserModel.findByIdAndUpdate(user._id,{
      password : hashedPassword,
      forgot_password_otp : "",
      forgot_password_otp_expiry : ""
    })

    return res.json({
      message : "Password reset successfully",
      error : false,
      success : true
    })
  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })
  }
}

// refresh token controller
const refreshtoken = async (req , res)=>{
  try {
    const refreshtoken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]; //[Bearer , token]
    if(!refreshtoken){
      return res.status(401).json({
        message : "No refresh token provided",
        error : true,
        success : false
      })
    }

    const verifyToken = await jwt.verify(refreshtoken , process.env.SECRET_KEY_REFRESH_TOKEN);
    if(!verifyToken){
      return res.status(403).json({
        message : "Invalid refresh token is provided",
        error : true,
        success : false
      })
    }

    const userId = verifyToken?._id;

    const newaccessToken = await generateAccessToken(userId);

    const cookiesOption ={
      httpOnly : true,
      secure : true,
      sameSite : "None"
    }

    res.cookie("accessToken" , newaccessToken , cookiesOption);

    return res.json({
      message : "Access token generated successfully",
      error : false,
      success : true,
      data : {
        accessToken : newaccessToken
      }
    })
  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })
  }
}


// get login user details controller
const userDetails = async (req , res)=>{
  try {
    const userId = req.userId; //middleware auth

    console.log(userId);

    const user = await UserModel.findById(userId).select("-password -refresh_token");
    

    return res.json({
      message : "User details fetched successfully",
      error : false,
      success : true,
      data : user
    })
  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      error : true,
      success : false
    })
  }
}


module.exports = {
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
  userDetails
};
