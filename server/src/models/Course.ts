import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Educator", required: true },
  level: { type: String, required: true },
  enrollmentType: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  lessons: { type: Array, required: true },
  thumbnail: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Course", CourseSchema);
