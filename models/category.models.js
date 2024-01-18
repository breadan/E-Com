import { Schema, model, SchemaTypes } from "mongoose";

const categorySchema = new Schema(
  {
    category: {
      type: "string",
      required: [true, "Category is Required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Category short name "],
      maxlength: [20, "Category long name "],
    },
    receviedId: SchemaTypes.ObjectId,
    senderId: SchemaTypes.ObjectId,
  },
  { timestamps: true }
);


export const categoryModel = model("Category", categorySchema);
