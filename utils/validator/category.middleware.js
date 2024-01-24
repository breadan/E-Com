//error from out express
//to handel any rejection outSide DB

import { check } from "express-validator";
import { validatorMiddleware } from "../../src/middleware/validator.middleware.js";

//id
const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id"),
  validatorMiddleware, //call it to send error to it//it catch error from here
];

//category
const categoryValidate = [
  check("name")
    .notEmpty()
    .withMessage("Category Required")
    .isLength({ min: 3 })
    .withMessage("Too short")
    .isLength({ max: 32 })
    .withMessage("Too Long"),
    validatorMiddleware,
];

export { getCategoryValidator, categoryValidate };
