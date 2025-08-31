const mongoose = require('mongoose');

const QuestionBankSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  question_type: { type: String, enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'ESSAY'], required: true },
  creator_user_id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('QuestionBank', QuestionBankSchema);
