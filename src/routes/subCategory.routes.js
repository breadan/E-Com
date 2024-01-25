import express from "express";
import { createSubCategory } from "../modules/subCategory/subCategory.controller.js";
import { createSubCategoryValidator } from "../../utils/validator/subCategory.validator.js";
const subCategoryRouter = express.Router();

//[x] post: /subCategory
subCategoryRouter.post(
  "/api/v1/subCategories",
  createSubCategoryValidator,
  createSubCategory
);

export default subCategoryRouter;
