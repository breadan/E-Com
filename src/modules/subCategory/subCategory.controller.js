import slugify from 'slugify';
import asyncHandler from 'express-async-handler';
import { ApiError } from '../../../utils/apiError.js';
import { SubCategory } from '../../../models/subCategory.model.js';

/*
 * @desc create a new subCategory
 * @route POST /api/v1/subCategory
 * @access public
 */
//middleware to check if category in body or in params
const setCategoryIdParams = (req, res, next) => {
  //nested Route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
const createSubCategory = asyncHandler(async (req, res) => {
  //create subcategory
  const { name, category } = req.body;

  const newSubCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category, //it is reference to category
  });
  res.status(200).json({ data: newSubCategory });
});

//******************************************************************* */
/*
 * @desc get all subCategories
 * @route get /api/v1/subCategories
 * @access public
 */
//nested Route
const createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  // req.filterObj = filterObject;
  console.log(filterObject);
  next();
};

const getSubCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObject)
    // .select("-_id")
    .skip(skip)
    .limit(limit);
  // .populate({ path: 'category', select: 'name -_id' });
  if (!subCategories) {
    return next(new ApiError(`subCategory not found `, 404));
  } else {
    res
      .status(201)
      .json({ results: subCategories.length, page, data: subCategories });
  }
});

//*********************************************************************** */
/*
 * @desc get specific SubCategory
 * @route get /api/v1/SubCategory/:id
 * @access public
 */
const getSpecificSubCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subCategory = await SubCategory.findById(id).populate({
    path: 'category',
    select: 'name -_id',
  });
  if (!subCategory) {
    //  return res.status(404).json({ error: "Category not found" });
    return next(new ApiError(`SubCategory not found this id ${id}`, 404));
  } else {
    res.status(201).json({ data: subCategory });
  }
});
//*********************************************************************** */

/*
 * @desc put updateSubCategory categories
 * @route get /api/v1/updateSubCategory/:id
 * @access public
 */
const updateSubCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { name, category } = req.body;
  if (!id) {
    return next(new ApiError(`SubCategory not found this id ${id}`, 404));
  }
  const newSubCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { returnOriginal: false },
  );
  if (!newSubCategory) {
    return next(new ApiError(`SubCategory not found this id ${id}`, 404));
  } else {
    res.status(201).json({ data: newSubCategory });
  }
});
//******************************************************************* */

/*
 * @desc delete specific subCategories
 * @route delete /api/v1/categories/:id
 * @access Private
 */
const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`SubCategory not found this id ${id}`, 500));
  } else {
    return res.json({ message: 'delete SubCategory successfully' });
  }
});
export {
  createSubCategory,
  getSubCategories,
  getSpecificSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createFilterObject,
  setCategoryIdParams,
};
