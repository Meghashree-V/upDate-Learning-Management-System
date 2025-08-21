import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, required: true },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    duration: String,
    price: Number,
    instructor: String,
    level: String,
    enrollmentType: String,
    capacity: Number,
    startDate: Date,
    endDate: Date,
    categories: [String],
    lessons: [lessonSchema],
    thumbnail: String,
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
