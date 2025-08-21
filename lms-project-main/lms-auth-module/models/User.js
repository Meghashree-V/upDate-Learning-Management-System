// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName:  { type: String, required: [true, "Last name is required"] },
    email:     { type: String, required: true, unique: true, lowercase: true, index: true },
    password:  { type: String, required: true, minlength: 6 },

    // Optional fields coming from your Signup.tsx
    phone: { type: String },
    qualification: { type: String },
    interests: { type: String },         // comma/line separated is fine
    userType: { type: String, enum: ["student", "educator", "Student/Learner", "Educator/Instructor"], default: "student" },
  },
  { timestamps: true }
);

// Hash password if modified
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", UserSchema);
