const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

// Fetch all grades
router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit grade
router.post('/:submissionId/grade', async (req, res) => {
  try {
    const submissionId = req.params.submissionId;
    const { score, feedback, grader_user_id } = req.body;

    if (!grader_user_id) {
      return res.status(400).json({ message: 'Grader user ID is required' });
    }

    const submission = await Submission.findById(submissionId);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    let finalScore = score;

    // Apply late penalty if applicable
    if (submission.status === 'late' && submission.assignment_id) {
      const assignment = await Assignment.findById(submission.assignment_id);
      if (assignment && assignment.due_date && assignment.points) {
        const daysLate = Math.max(
          0,
          Math.ceil((submission.submitted_at - assignment.due_date) / (1000 * 60 * 60 * 24))
        );
        const penaltyPercentage = 0.1; // 10% per day
        const penalty = assignment.points * penaltyPercentage * daysLate;
        finalScore = Math.max(0, score - penalty);
      }
    }

    const grade = new Grade({
      submission_id: submissionId,
      grader_user_id,
      score: finalScore,
      feedback,
      graded_at: new Date(),
    });

    await grade.save();

    submission.status = 'graded';
    await submission.save();

    res.json(grade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
