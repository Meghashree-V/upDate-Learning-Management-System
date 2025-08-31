import mongoose from "mongoose";

const RevenueSchema = new mongoose.Schema({
  month: { type: String, required: true },
  revenue: { type: Number, required: true },
  target: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Revenue", RevenueSchema);
