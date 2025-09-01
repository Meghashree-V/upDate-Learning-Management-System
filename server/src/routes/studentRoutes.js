const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyToken = require('../middlewares/verifyToken');
// const authRole = require('../middlewares/authRole'); // if needed

// Use your actual models if exist:
const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', new mongoose.Schema({
  title: String,
  questions: Array,
  createdBy: mongoose.Schema.Types.ObjectId
}));

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  createdBy: mongoose.Schema.Types.ObjectId
}));

// GET /student/quizzes - list (hide correct answers if stored in questions)
router.get('/quizzes', verifyToken, async (req, res) => {
  try {
    const quizzes = await Quiz.find().lean();
    // If questions contain answers, remove them before sending
    const safe = quizzes.map(q => {
      if (Array.isArray(q.questions)) {
        q.questions = q.questions.map(qq => {
          const copy = { ...qq };
          delete copy.correctAnswer;
          return copy;
        });
      }
      return q;
    });
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /student/quizzes/:id/attempt
router.post('/quizzes/:id/attempt', verifyToken, async (req, res) => {
  try {
    const { answers } = req.body;
    // Implement storing attempts, grading etc. For now, echo back.
    // You can create a QuizAttempt model to persist attempts.
    res.json({ message: 'Attempt recorded', quizId: req.params.id, answers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /student/assignments
router.get('/assignments', verifyToken, async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: add multer for file upload if you want file submissions
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

router.post('/assignments/:id/submit', verifyToken, async (req, res) => {
  try {
    // For simple text submission:
    const { submissionText } = req.body;
    // Save to DB as StudentSubmission model (recommended) — placeholder response:
    res.json({ message: 'Submission received', assignmentId: req.params.id, submissionText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
