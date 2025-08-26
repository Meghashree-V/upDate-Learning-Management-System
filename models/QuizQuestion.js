const mongoose = require('mongoose');

const QuizQuestionSchema = new mongoose.Schema({
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
  order: { type: Number, default: 0 },
  correct_answer: { type: String, required: true } // <-- ADD THIS
});

QuizQuestionSchema.index({ quiz_id: 1, question_id: 1 }, { unique: true });

module.exports = mongoose.model('QuizQuestion', QuizQuestionSchema);
