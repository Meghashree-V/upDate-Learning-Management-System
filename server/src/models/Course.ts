import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILesson {
  title: string;
  duration: string;
  type: string;
}

export interface ICourse extends Document {
  title: string;
  description?: string;
  duration?: string;
  price?: number;
  instructor?: string;
  level?: string;
  enrollmentType?: string;
  capacity?: number;
  startDate?: Date;
  endDate?: Date;
  categories?: string[];
  lessons?: ILesson[];
  thumbnail?: string | null;
  isFree?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, required: true },
});

const courseSchema = new Schema<ICourse>(
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
    isFree: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
export default Course;
