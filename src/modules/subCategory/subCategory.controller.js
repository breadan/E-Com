import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { ApiError } from "../../../utils/apiError.js";
import { SubCategory } from "../../../models/subCategory.model.js";

/*
 * @desc create a new subCategory
 * @route POST /api/v1/subCategory
 * @access Private
 */
const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const newSubCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category, //it is reference to category
  });
  res.status(200).json({ data: newSubCategory });
});

export { createSubCategory };
//******************************************************************* */
