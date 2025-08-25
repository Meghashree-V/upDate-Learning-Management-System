import mongoose from "mongoose";

const UserActivitySchema = new mongoose.Schema({
  time: { type: String, required: true },
  active: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("UserActivity", UserActivitySchema);
