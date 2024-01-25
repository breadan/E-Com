//FIXME 2  error from out express
//to handel any rejection outSide DB

import { check } from "express-validator";
import { validatorMiddleware } from "../../src/middleware/validator.middleware.js";

//id
const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id"),
  validatorMiddleware, //call it to send error to it//it catch error from here
];

//create category
const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Required")
    .isLength({ min: 3 })
    .withMessage("Too short")
    .isLength({ max: 32 })
    .withMessage("Too Long"),
  check("Category").isMongoId().withMessage("SubCategory ID Required"),
  validatorMiddleware,
];

const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id"),
  validatorMiddleware,
];

const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id"),
  validatorMiddleware,
];

export {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
};
