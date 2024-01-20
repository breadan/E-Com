import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: "string",
      required: [true, "Category is Required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Category short name "],
      maxlength: [20, "Category long name "],
    },
    slug: {
      type: "string",
      lowercase: true,
    },
    image: String,
    
  },
  { timestamps: true }
);

const Category = model('Category' , categorySchema)
export  {Category};
