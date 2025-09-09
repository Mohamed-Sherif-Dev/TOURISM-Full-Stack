const UserModel = require("../models/user.model");

const Admin = async (req, res, next) => {
    try {
        const userId = req.userId;

        const user = await UserModel.findById(userId).select("-password -refreshToken -forgot_password_otp -forgot_password-otp_expiry");

        if(user.role !== "ADMIN"){
            return res.status(403).json({
                message : "Access denied. Admins only.",
                success : false,
                error : true,
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message : error.message || "Error in admin middleware",
            success : false,
            error : true,
        })
    }
}

module.exports = Admin;