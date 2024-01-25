import { Category } from "../../../models/category.models.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { ApiError } from "../../../utils/apiError.js";

// TODO : "category2"

/*
 * @desc create a new category
 * @route POST /api/v1/categories
 * @access Private
 */
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const existsCategory = await Category.findOne({ name });
  if (existsCategory) {
    return next(new ApiError(`Category Already Exists `, 404));
  } else {
    const newCategory = await Category.create({ name, slug: slugify(name) });
    res.status(200).json({ data: newCategory });
  }
});
//******************************************************************* */

/*
 * @desc get all categories
 * @route get /api/v1/categories
 * @access public
 */
const getCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await Category.find({})
    .select("-_id")
    .skip(skip)
    .limit(limit);
  if (!categories) {
    return next(new ApiError(`Category not found `, 404));
  } else {
    res
      .status(201)
      .json({ results: categories.length, page, data: categories });
  }
});

//******************************************************************* */

/*
 * @desc get specific categories
 * @route get /api/v1/categories/:id
 * @access public
 */
const getSpecificCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findById(id).select("-_id");
  if (!category) {
    //  return res.status(404).json({ error: "Category not found" });
    return next(new ApiError(`Category not found this id ${id}`, 404));
  } else {
    res.status(201).json({ data: category });
  }
});

//******************************************************************* */

/*
 * @desc get specific categories
 * @route get /api/v1/categories/:id
 * @access Private
 */
const updateCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!id) {
    return next(new ApiError(`Category not found this id ${id}`, 404));
  }
  const newCategory = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { returnOriginal: false }
  );
  if (!newCategory) {
    return next(new ApiError(`Category not found this id ${id}`, 404));
  } else {
    res.status(201).json({ data: newCategory });
  }
});

//******************************************************************* */

/*
 * @desc delete specific categories
 * @route delete /api/v1/categories/:id
 * @access Private
 */
const deleteCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`Category not found this id ${id}`, 500));
  } else {
    res.status(204).json({ message: "delete category successfully" });
  }
});

export {
  createCategory,
  getCategories,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
};
