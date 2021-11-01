const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.tokenSecretKey;
const getToken = async (id, email) => {
  const token = await jwt.sign(
    {
      id: id,
      email: email,
    },
    secretKey,
    { expiresIn: "24h" }
  );
  return token;
};

module.exports = { getToken };
