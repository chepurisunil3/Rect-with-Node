const express = require("express");
const {
  addCategory,
  getCategories,
} = require("../controllers/retailers/products");
const multer = require("multer");
const auth = require("../middlewares/auth");
const router = express.Router();
const { ProductsValidator } = require("../validators/retailers/products");
const { createMulterDiskStorage } = require("../utils/multer-disk-storage");

const categoryIconStorage = createMulterDiskStorage(
  "./static/retailers/products/category",
  "categoryName"
);
const categoryLogoUpload = multer({ storage: categoryIconStorage });

router.post(
  "/addCategory",
  auth,
  categoryLogoUpload.single("categoryImage"),
  ProductsValidator("ADD_CATEGORY"),
  addCategory
);

router.get("/getCategories", auth, getCategories);

module.exports = router;
