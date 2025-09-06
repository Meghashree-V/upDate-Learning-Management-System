import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, enum: ["video", "quiz", "assignment"], required: true },
  videoUrl: { type: String }, // ✅ Cloudinary URL if type = video
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Educator",
    required: true,
  },
  level: { type: String, required: true },
  enrollmentType: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  lessons: [LessonSchema], // ✅ structured lessons
  thumbnail: { type: String }, // ✅ Cloudinary thumbnail
  categories: [{ type: String }], // ✅ store categories
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", CourseSchema);
