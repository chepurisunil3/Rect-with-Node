const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createMulterDiskStorage } = require("../utils/multer-disk-storage");
const { UserValidator } = require("../validators/retailers/users");
const { ProductsValidator } = require("../validators/retailers/products");
const {
  addUser,
  checkLogin,
  getUserDetails,
} = require("../controllers/retailers/users");
const { deleteCategory } = require("../controllers/retailers/products");
const authMiddleware = require("../middlewares/auth");

const logoStorage = createMulterDiskStorage(
  "./static/retailers/logos",
  "companyName"
);
const logoUpload = multer({ storage: logoStorage });

router.post(
  "/addUser",
  logoUpload.single("companyLogo"),
  UserValidator("ADD_USER"),
  addUser
);
router.get("/checkLogin", UserValidator("CHECK_LOGIN"), checkLogin);
router.get("/getUser", authMiddleware, getUserDetails);
router.delete(
  "/deleteCategory/:id",
  ProductsValidator("DELETE_CATEGORY"),
  deleteCategory
);
module.exports = router;
