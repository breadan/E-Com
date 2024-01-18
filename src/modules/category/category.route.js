import express from "express";
import getCategories from "../category/category.controller.js"


const categoryRouter = express.Router();

categoryRouter.post("/api/v1/categories",  getCategories);






export default categoryRouter;
