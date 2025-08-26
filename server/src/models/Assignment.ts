import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAssignment extends Document {
  title: string;
  description?: string;
  courseId: string; // reference to Course (string for now)
  dueDate?: Date;
  maxScore?: number;
  published: boolean;
  createdBy: string; // admin user id
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    courseId: { type: String, required: true, index: true },
    dueDate: { type: Date },
    maxScore: { type: Number, default: 100 },
    published: { type: Boolean, default: false },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

let Assignment: Model<IAssignment>;
try {
  Assignment = mongoose.model<IAssignment>('Assignment');
} catch {
  Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
}

export default Assignment;
