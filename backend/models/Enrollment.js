import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
  month: { type: String, required: true },
  enrollments: { type: Number, required: true },
  revenue: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Enrollment", EnrollmentSchema);
