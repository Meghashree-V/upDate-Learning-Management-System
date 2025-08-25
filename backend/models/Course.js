import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  course: { type: String, required: true },
  enrollments: Number,
  completion: Number,
  rating: Number,
}, { timestamps: true });

export default mongoose.model("Course", CourseSchema);
