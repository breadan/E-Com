import mongoose, { Schema, model } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: "string",
      trim: true,
      required: [true, "SubCategory is Required"], //not important
      unique: [true, "SubCategory must be unique"],
      minlength: [2, "SubCategory short name "],
      max_length: [32, "SubCategory long name "],
    },
    slug: {
      type: "string",
      lowercase: true,
    },
    Category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },

  { timestamps: true }
);

const SubCategory = model("SubCategory", subCategorySchema);
export { SubCategory };
