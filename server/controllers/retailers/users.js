const { validationResult } = require("express-validator");
const RetailersSchema = require("../../models/retailers/retailers");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { getToken } = require("../../utils/jwt-token");
const redisClient = require("../../utils/redis-connection");
const saltRounds = Number(process.env.saltRounds);
dotenv.config();
const secretKey = process.env.tokenSecretKey;

const addUser = async (req, res, next) => {
  const errors = validationResult(req).mapped();
  if (Object.keys(errors).length > 0) {
    res.json({ errors: errors, success: false });
    return;
  }
  const { password } = req.body;
  if (req.file) {
    req.body.companyLogo = req.file.filename;
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);
    req.body.password = encryptedPassword;
    const retailersSchema = new RetailersSchema(req.body);
    await retailersSchema.save();
    delete retailersSchema.password;
    const token = await getToken(retailersSchema._id, retailersSchema.email);
    res.cookie("auth", token);
    res.json({
      success: true,
      data: retailersSchema.getUserReadableData(),
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      errors: {
        internalError: { msg: "Internal Error", param: "internalError" },
      },
    });
  }
};

const checkLogin = async (req, res, next) => {
  const errors = validationResult(req).mapped();
  if (Object.keys(errors).length > 0) {
    res.json({ errors: errors, success: false });
    return;
  }
  try {
    const user = await RetailersSchema.findOne({
      email: req.query.email,
    }).select("+password");
    if (user != null) {
      const isPasswordCorrect = await bcrypt.compare(
        req.query.password,
        user.password
      );
      if (isPasswordCorrect) {
        const token = await getToken(user._id, user.email);
        res.cookie("auth", token);
        res.json({ data: user.getUserReadableData(), success: true });
      } else {
        res.json({
          success: false,
          errors: { email: { msg: "Incorrect Password", param: "password" } },
        });
      }
    } else {
      res.json({
        success: false,
        errors: { email: { msg: "Email Id Not Found", param: "email" } },
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      errors: {
        internalError: { msg: "Internal Error", param: "internalError" },
      },
    });
  }
};
const getUserDetails = async (req, res, next) => {
  try {
    const user = await redisClient.get(req.user.id.toString());
    if (user) {
      res.status(200).json({ success: true, data: user.getUserReadableData() });
    } else {
      user = await RetailersSchema.findById(req.user.id);
      if (user) {
        await redisClient.set(
          req.user.id.toString(),
          JSON.stringify(user.getUserReadableData())
        );
        res
          .status(200)
          .json({ success: true, data: user.getUserReadableData() });
      } else {
        res.status(202).json({ success: false, message: "User not found!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addUser, checkLogin, getUserDetails };
