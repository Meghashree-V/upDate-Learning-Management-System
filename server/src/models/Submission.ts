import mongoose, { Schema, Document, Model } from 'mongoose';

export type SubmissionStatus = 'submitted' | 'graded';

export interface ISubmission extends Document {
  assignmentId: string;
  studentId: string;
  answers?: any; // JSON blob
  file?: string | null; // uploaded file path
  score?: number | null;
  feedback?: string | null;
  status: SubmissionStatus;
  submittedAt: Date;
  gradedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    assignmentId: { type: String, required: true, index: true },
    studentId: { type: String, required: true, index: true },
    answers: { type: Schema.Types.Mixed },
    file: { type: String, default: null },
    score: { type: Number, default: null },
    feedback: { type: String, default: null },
    status: { type: String, enum: ['submitted', 'graded'], default: 'submitted' },
    submittedAt: { type: Date, default: () => new Date() },
    gradedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

let Submission: Model<ISubmission>;
try {
  Submission = mongoose.model<ISubmission>('Submission');
} catch {
  Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);
}

export default Submission;
