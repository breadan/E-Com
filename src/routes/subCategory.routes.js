import express from 'express';
import {
  createFilterObject,
  createSubCategory,
  deleteSubCategory,
  getSpecificSubCategory,
  getSubCategories,
  updateSubCategory,
} from '../modules/subCategory/subCategory.controller.js';
import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} from '../../utils/validator/subCategory.validator.js';

const subCategoryRouter = express.Router({ mergeParams: true });

//[x] post: /subCategory
subCategoryRouter.post(
  '/api/v1/createSubCategory',
  createSubCategoryValidator,
  createSubCategory,
);

//[x] get: /subCategories
subCategoryRouter.get('/', createFilterObject, getSubCategories); //[x] get:id /subCategories

subCategoryRouter.get(
  '/api/v1/subCategory/:id',
  getSubCategoryValidator,
  getSpecificSubCategory,
);
//[x] get:id /subCategories
subCategoryRouter.put(
  '/api/v1/updateSubCategory/:id',
  updateSubCategoryValidator,
  updateSubCategory,
);
//[x] get:id /subCategories
subCategoryRouter.delete(
  '/api/v1/deleteSubCategory/:id',
  deleteSubCategoryValidator,
  deleteSubCategory,
);
export default subCategoryRouter;
