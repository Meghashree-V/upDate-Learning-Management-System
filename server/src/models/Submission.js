const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  assignment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  user_id: { type: String, required: true },
  submitted_at: { type: Date, default: Date.now },
  content: { type: mongoose.Schema.Types.Mixed }, // file URL or JSON for quiz answers
  status: { type: String, enum: ['submitted', 'late', 'graded', 'regrading_requested'], default: 'submitted' },
  
  // Add these fields for quiz submissions
  score: { type: Number, default: null },
  total: { type: Number, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
