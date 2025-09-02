import mongoose, { Document, Schema } from 'mongoose';

export interface IEducator extends Document {
  name: string;
  email: string;
  phone?: string;
  specialization?: string;
  status?: 'active' | 'inactive';
  coursesCount?: number;
  studentsCount?: number;
  rating?: number;
  joinDate?: Date;
  avatar?: string;
  bio?: string;
}

const EducatorSchema = new Schema<IEducator>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  specialization: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  coursesCount: { type: Number, default: 0 },
  studentsCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  joinDate: { type: Date, default: Date.now },
  avatar: String,
  bio: String,
});

const Educator = mongoose.model<IEducator>('Educator', EducatorSchema);
export default Educator;
