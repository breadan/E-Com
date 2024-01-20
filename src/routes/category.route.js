import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getSpecificCategory, updateCategory } from "../modules/categoryService/category.controller.js";
import express from "express";


const categoryRouter = express.Router();

categoryRouter.post("/api/v1/categories",  createCategory);
categoryRouter.get("/api/v1/categories",  getCategories);
categoryRouter.get("/api/v1/categories/:id",  getSpecificCategory);
categoryRouter.put("/api/v1/categories/:id",  updateCategory);
categoryRouter.delete("/api/v1/categories/:id", deleteCategory);






export default categoryRouter;