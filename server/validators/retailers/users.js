const { body, query } = require("express-validator");
const { Types } = require("mongoose");
const UserValidator = (method) => {
  switch (method) {
    case "ADD_USER":
      return [
        body("password")
          .notEmpty()
          .isLength({ min: 3 })
          .matches(/\d/)
          .withMessage("Password Validation Failed"),
        body("password")
          .custom((value, { req }) => {
            if (value !== req.body.passwordConfirm) {
              return false;
            }
            return true;
          })
          .withMessage("Passwords doesn't match"),
        body("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
      ];
    case "CHECK_LOGIN":
      return [
        query("email").notEmpty().isEmail().withMessage("Invalid Email Id"),
        query("password").notEmpty().withMessage("Password cannot be empty"),
      ];
    default:
      return [];
  }
};
module.exports = { UserValidator };
