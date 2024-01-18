import mongoose, { Schema } from "mongoose";

const category = new Schema({
    name:String,
    categoryName:String,
    description:String
})

export default mongoose.model('Category',category)