const { validationResult } = require("express-validator");
const CategoriesSchema = require("../../models/retailers/categories");
const addCategory = async (req, res, next) => {
  const errors = validationResult(req).mapped();
  if (Object.keys(errors).length > 0) {
    res.json({ errors: errors, success: false });
    return;
  }
  if (req.file) {
    req.body.categoryImage = req.file.filename;
  }
  const currentCategory = await CategoriesSchema.findOne({
    categoryName: req.body.categoryName,
  });
  try {
    if (currentCategory) {
      const updatedDocument = await CategoriesSchema.findOneAndUpdate(
        { _id: currentCategory },
        { $addToSet: { retailers: req.user.id } }
      );
      res.json({
        success: true,
        category: updatedDocument.getUserReadableData(),
      });
    } else {
      req.body.retailers = [req.user.id];
      const Category = new CategoriesSchema(req.body);
      await Category.save();
      res.json({ success: true, category: Category.getUserReadableData() });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Internal Error" });
  }
};

const getCategories = async (req, res, next) => {
  try {
    const category = await CategoriesSchema.find({
      retailers: req.user.id,
    }).populate("retailers");
    res.json({ success: true, data: category });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await CategoriesSchema.findByIdAndDelete(req.params.id);
    res.json({ success: true, id: req.params.id });
  } catch (e) {
    res.json({ success: false, id: req.params.id });
  }
};
module.exports = { addCategory, getCategories, deleteCategory };
