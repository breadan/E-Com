import { Category } from "../../../models/category.models.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler"



/*
 * @desc create a new category 
 * @route POST /api/v1/categories
 * @access Private
 */
const createCategory = asyncHandler( async (req, res) => {
  const {name} = req.body;
  const existsCategory = await Category.findOne({name});
  if(existsCategory) {
    return res.status(400).json({ error: "Category already exists" });
  }else {

    const newCategory = await Category.create({ name, slug: slugify(name) });
    res.status(200).json({  newCategory });
  
  }
  
  
});
//******************************************************************* */

/*
 * @desc get all categories
 * @route get /api/v1/categories
 * @access public
 */
const getCategories = asyncHandler( async(req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  
 const categories = await Category.find({}).select('-_id').skip(skip).limit(limit);
  res.status(201).json({results: categories.length, page, data: categories})
});

//******************************************************************* */

/*
 * @desc get specific categories
 * @route get /api/v1/categories/:id
 * @access public
 */
const getSpecificCategory = asyncHandler( async(req, res) => {
const id = req.params.id;
 const category = await Category.findById(id).select('-_id');
 if(!category) {
   return res.status(404).json({ error: "Category not found" });
 }else {

   res.status(201).json({ data: category})
 }
});

//******************************************************************* */

/*
 * @desc get specific categories
 * @route get /api/v1/categories/:id
 * @access Private
 */
const updateCategory = asyncHandler( async(req, res) => {
const id = req.params.id;
 const {name} = req.body;
if (!id) {
  return res.status(404).json({
    status: 404,
    message: "Category not found",
  });
}
 const newcategory = await Category.findOneAndUpdate({_id: id}, {name, slug: slugify(name)},  { returnOriginal: false})
  res.status(201).json({ data: newcategory})
});

//******************************************************************* */

/*
 * @desc delete specific categories
 * @route delete /api/v1/categories/:id
 * @access Private
 */
const deleteCategory = asyncHandler( async(req, res) => {
const id = req.params.id;
 const category = await Category.findByIdAndDelete( id)
 if (!category) {
  return res.status(404).json({
    status: 404,
    message: "Category not found",
  });
}else {
   res.status(204).json({ message: "delete category successfully"})
}
});



export {  createCategory, getCategories, getSpecificCategory, updateCategory, deleteCategory };
