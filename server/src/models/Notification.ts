import mongoose, { Schema, Document, Model } from 'mongoose';

export type NotificationTarget = 'all' | 'students' | 'admins' | 'specific';

export interface INotification extends Document {
  title: string;
  message: string;
  target: NotificationTarget;
  userIds?: string[]; // only for 'specific'
  courseId?: string | null; // optional course context
  createdBy: string; // admin id
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    target: { type: String, enum: ['all', 'students', 'admins', 'specific'], required: true },
    userIds: { type: [String], default: [] },
    courseId: { type: String, default: null, index: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

let Notification: Model<INotification>;
try {
  Notification = mongoose.model<INotification>('Notification');
} catch {
  Notification = mongoose.model<INotification>('Notification', NotificationSchema);
}

export default Notification;
