import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getSpecificCategory, updateCategory } from "../modules/categoryController/category.controller.js";
import express from "express";
import { getCategoryValidator } from "../../utils/validator/category.middleware.js";


const categoryRouter = express.Router();

categoryRouter.post("/api/v1/categories",  createCategory);
categoryRouter.get("/api/v1/categories", getCategoryValidator, getCategories);
categoryRouter.get("/api/v1/categories/:id",getCategoryValidator ,getSpecificCategory);
categoryRouter.put("/api/v1/categories/:id",  updateCategory);
categoryRouter.delete("/api/v1/categories/:id", deleteCategory);






export default categoryRouter;