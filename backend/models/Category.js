import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  color: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema);
