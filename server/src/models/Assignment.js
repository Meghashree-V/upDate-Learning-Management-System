const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  due_date: Date,
  points: Number,
  file: String, // store filename
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
