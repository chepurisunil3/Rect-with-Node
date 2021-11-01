const { body, param } = require("express-validator");
const ProductsValidator = (method) => {
  switch (method) {
    case "ADD_CATEGORY":
      return [body("categoryName").notEmpty()];
    case "DELETE_CATEGORY":
      return [param("id").notEmpty()];
    default:
      return [];
  }
};
module.exports = { ProductsValidator };
