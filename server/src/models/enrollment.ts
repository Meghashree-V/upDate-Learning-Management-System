import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  price: { type: Number, required: true },
  enrolledAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" }
});

export default mongoose.model("Enrollment", EnrollmentSchema);
