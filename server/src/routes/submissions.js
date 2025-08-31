const express = require('express')
const router = express.Router()
const Submission = require('../models/Submission')
const Assignment = require('../models/Assignment')
const Quiz = require('../models/Quiz')

// ✅ Get all submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('assignment_id', 'title due_date')
      .populate('quiz_id', 'title')
      .lean() // convert to plain objects
    // Ensure score is always defined
    const data = submissions.map(s => ({
      ...s,
      score: s.score ?? null // set null if undefined
    }))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ✅ Create assignment submission
router.post('/assignments/:assignmentId', async (req, res) => {
  try {
    const { assignmentId } = req.params
    const { user_id, content } = req.body

    const assignment = await Assignment.findById(assignmentId)
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' })

    const now = new Date()
    let status = 'submitted'
    if (now > assignment.due_date) status = 'late'

    const submission = new Submission({
      assignment_id: assignmentId,
      user_id,
      submitted_at: now,
      content,
      status
    })

    await submission.save()
    res.status(201).json(submission)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// ✅ Create quiz submission
router.post('/quizzes/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params
    const { user_id, answers, score } = req.body

    const quiz = await Quiz.findById(quizId)
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' })

    const submission = new Submission({
      quiz_id: quizId,
      user_id,
      submitted_at: new Date(),
      content: answers,
      score: score ?? 0, // optional: include score if calculated
      status: 'submitted'
    })

    await submission.save()
    res.status(201).json(submission)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// ✅ Delete submission
router.delete('/:submissionId', async (req, res) => {
  try {
    const { submissionId } = req.params
    const deleted = await Submission.findByIdAndDelete(submissionId)
    if (!deleted) return res.status(404).json({ message: 'Submission not found' })
    res.json({ success: true, message: 'Submission deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
