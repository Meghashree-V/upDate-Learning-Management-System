const mongoose = require('mongoose');

const QuestionOptionSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
  option_text: { type: String, required: true },
  is_correct: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('QuestionOption', QuestionOptionSchema);
