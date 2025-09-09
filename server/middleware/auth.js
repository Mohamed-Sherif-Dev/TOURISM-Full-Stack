
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.cookies?.accessToken;

    if (!token && req.headers?.authorization) {
      const [scheme, cred] = req.headers.authorization.split(" ");
      if (scheme?.toLowerCase() === "bearer") token = cred;
    }

    if (!token) {
      return res.status(401).json({ message: "You have NOT Login" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    req.userId = decoded.id;        // 
    req.userRole = decoded.role;    // 
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized User access",
      error: true,
      success: false,
    });
  }
};

module.exports = auth;
