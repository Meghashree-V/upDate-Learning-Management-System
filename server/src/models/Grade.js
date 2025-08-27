const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  submission_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Submission', 
    required: true 
  },
  grader_user_id: { type: String, required: true },
  score: { type: Number, required: true },
  feedback: { type: String },
  graded_at: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Grade', GradeSchema);



