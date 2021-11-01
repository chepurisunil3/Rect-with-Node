const { Schema, Types, model } = require("mongoose");

const CategoriesSchema = new Schema(
  {
    categoryName: {
      required: true,
      type: String,
      index: true,
    },
    categoryImage: {
      type: String,
      default: "default-1631444762694.png",
    },
    retailers: [{ type: Types.ObjectId, ref: "retailers", index: true }],
  },
  { versionKey: false }
);

CategoriesSchema.methods.getUserReadableData = function () {
  return {
    id: this._id,
    categoryName: this.categoryName,
    categoryImage: this.categoryImage,
  };
};
module.exports = model("categories", CategoriesSchema);
