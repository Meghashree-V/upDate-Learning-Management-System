const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  title: { type: String, required: true },
  time_limit: { type: Number, default: 0 },
  allowed_attempts: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
