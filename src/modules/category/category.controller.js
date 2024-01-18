 import {categoryModel} from "../../../models/category.models.js"

 
 const getCategories = (req, res) => {
    const name = req.body.name;
    console.log(req.body)

    const newCategory = new categoryModel({name});
    newCategory.save().then((doc) => {
        res.json(doc);
    })
    .catch((err) => {
         res.status(400).json({msg: err.message});
 
    })
}

export default getCategories;