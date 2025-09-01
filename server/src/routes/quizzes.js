const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Quiz = require('../models/Quiz');
const QuizQuestion = require('../models/QuizQuestion');
const QuestionBank = require('../models/QuestionBank');
const QuestionOption = require('../models/QuestionOption');
const Submission = require('../models/Submission');

// ✅ Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET all grades
router.get('/', async (req, res) => {
  try {
    const grades = await Submission.find().populate('user_id').populate('quiz_id');
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create quiz
router.post('/', async (req, res) => {
  try {
    const { course_id, title, time_limit, allowed_attempts, questions } = req.body;
    const quiz = new Quiz({ course_id, title, time_limit, allowed_attempts });
    await quiz.save();

    // Save QuizQuestions
    for (const q of questions) {
      await new QuizQuestion({
        quiz_id: quiz._id,
        question_id: q.question_id,
        order: q.order || 0,
        correct_answer: q.correct_answer
      }).save();
    }

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get quiz questions by quiz id
router.get('/:id/questions', async (req, res) => {
  try {
    const quizId = req.params.id;

    const questions = await QuizQuestion.aggregate([
      { $match: { quiz_id: new mongoose.Types.ObjectId(quizId) } },
      {
        $lookup: {
          from: 'questionbanks',
          localField: 'question_id',
          foreignField: '_id',
          as: 'question'
        }
      },
      { $unwind: '$question' },
      {
        $lookup: {
          from: 'questionoptions',
          localField: 'question_id',
          foreignField: 'question_id',
          as: 'options'
        }
      },
      {
        $project: {
          _id: '$question._id',
          question_id: '$question._id',
          text: '$question.question_text',
          options: {
            $map: {
              input: '$options',
              as: 'opt',
              in: { text: '$$opt.option_text', is_correct: '$$opt.is_correct' }
            }
          }
        }
      }
    ]);

    res.json({ quiz_id: quizId, questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Submit quiz
router.post('/:id/submit', async (req, res) => {
  try {
    const quizId = req.params.id;
    const { user_id, answers } = req.body;

    const quizQuestions = await QuizQuestion.find({ quiz_id: quizId });
    if (!quizQuestions || quizQuestions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this quiz' });
    }

    let score = 0;
    answers.forEach(a => {
      const q = quizQuestions.find(q => q._id.toString() === a.questionId);
      if (q && a.answer === q.correct_answer) score++;
    });

    const submission = new Submission({
      quiz_id: quizId,
      user_id,
      content: answers,
      score,
      total: quizQuestions.length,
      status: 'graded', // optional
      submitted_at: new Date()
    });

    await submission.save();

    res.json({ success: true, score, total: quizQuestions.length, submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a quiz by ID
router.delete('/:id', async (req, res) => {
  try {
    const quizId = req.params.id;

    // Remove associated QuizQuestions
    await QuizQuestion.deleteMany({ quiz_id: quizId });

    // Remove the quiz itself
    await Quiz.findByIdAndDelete(quizId);

    res.json({ success: true, message: 'Quiz deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
