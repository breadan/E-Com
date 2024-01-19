import { Router } from "express";
import { getCategories } from "../modules/categoryService/category.controller.js";


const router = Router();

router.get("/api/v1/categories",  getCategories);






export default router;