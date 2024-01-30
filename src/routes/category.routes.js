import {
  createCategory,
  deleteCategory,
  getCategories,
  getSpecificCategory,
  updateCategory,
} from '../modules/category/category.controller.js';
import express from 'express';
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
} from '../../utils/validator/category.validator.js';
import subCategoryRouter from './subCategory.routes.js';

const categoryRouter = express.Router();
//to handel the category child routes 1
categoryRouter.use(
  '/api/v1/category/:categoryId/getSubCategories',
  subCategoryRouter,
);
//MARK
categoryRouter.post(
  '/api/v1/categories',
  createCategoryValidator,
  createCategory,
);
//MARK
categoryRouter.get('/api/v1/categories', getCategories);
//MARK
categoryRouter.get(
  '/api/v1/categories/:id',
  getCategoryValidator,
  getSpecificCategory,
);
//MARK
categoryRouter.put(
  '/api/v1/categories/:id',
  updateCategoryValidator,
  updateCategory,
);
//MARK
categoryRouter.delete(
  '/api/v1/categories/:id',
  deleteCategoryValidator,
  deleteCategory,
);

export default categoryRouter;
