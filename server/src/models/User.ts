import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'student' | 'admin';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string; // hashed
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student', required: true },
  },
  { timestamps: true }
);

let User: Model<IUser>;
try {
  User = mongoose.model<IUser>('User');
} catch {
  User = mongoose.model<IUser>('User', UserSchema);
}

export default User;
