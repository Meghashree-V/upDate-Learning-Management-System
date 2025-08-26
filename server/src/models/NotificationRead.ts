import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotificationRead extends Document {
  notificationId: string;
  userId: string;
  readAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationReadSchema = new Schema<INotificationRead>(
  {
    notificationId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    readAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

NotificationReadSchema.index({ notificationId: 1, userId: 1 }, { unique: true });

let NotificationRead: Model<INotificationRead>;
try {
  NotificationRead = mongoose.model<INotificationRead>('NotificationRead');
} catch {
  NotificationRead = mongoose.model<INotificationRead>('NotificationRead', NotificationReadSchema);
}

export default NotificationRead;
