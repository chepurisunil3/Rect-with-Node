const express = require("express");
const {
  addCategory,
  getCategories,
  deleteCategory,
  getCategory,
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

router.get("/", (req, res) => {
  res.send("<h1>Welcome to products API</h1>");
});

router.post(
  "/addCategory",
  auth,
  categoryLogoUpload.single("categoryImage"),
  ProductsValidator("ADD_CATEGORY"),
  addCategory
);
router.get(
  "/category/:id",
  auth,
  ProductsValidator("GET_CATEGORY"),
  getCategory
);
router.get("/categories", auth, getCategories);
router.delete(
  "/category/:id",
  auth,
  ProductsValidator("DELETE_CATEGORY"),
  deleteCategory
);

module.exports = router;
