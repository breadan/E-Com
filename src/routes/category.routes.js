import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getSpecificCategory,
  updateCategory,
} from "../modules/category/category.controller.js";
import express from "express";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
} from "../../utils/validator/category.validator.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/api/v1/categories",
  createCategoryValidator,
  createCategory
);
categoryRouter.get("/api/v1/categories", getCategories);
categoryRouter.get(
  "/api/v1/categories/:id",
  getCategoryValidator,
  getSpecificCategory
);
categoryRouter.put(
  "/api/v1/categories/:id",
  updateCategoryValidator,
  updateCategory
);
categoryRouter.delete(
  "/api/v1/categories/:id",
  deleteCategoryValidator,
  deleteCategory
);

export default categoryRouter;
