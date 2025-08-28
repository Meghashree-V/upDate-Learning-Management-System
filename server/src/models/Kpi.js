import mongoose from "mongoose";

const KpiSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, required: true },
  trend: { type: String, enum: ["up", "down"], required: true },
  icon: { type: String, required: true },   // Store icon name as string
  color: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Kpi", KpiSchema);
