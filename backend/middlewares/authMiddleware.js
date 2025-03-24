const jwt = require("jsonwebtoken");

if (process.env.NODE !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

const verifyUser = (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(401).json({ message: "Send token over request" });
    }

    // Verify JWT token
    // console.log(process.env.SECRET_KEY);
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.userEmailAddress = data.email;
    req.userId = data.id;

    next(); // Proceed to next middleware or controller
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyUser;
