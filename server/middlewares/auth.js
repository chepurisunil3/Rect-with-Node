const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.tokenSecretKey;
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.cookies.auth;

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, jwtSecret, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Authorization denied" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
