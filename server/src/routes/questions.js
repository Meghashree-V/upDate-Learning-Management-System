const express = require('express');
const router = express.Router();
const QuestionBank = require('../models/QuestionBank');
const QuestionOption = require('../models/QuestionOption');

// Create Question
router.post('/', async (req, res) => {
  try {
    const { question_text, question_type, creator_user_id, options } = req.body;
    const question = new QuestionBank({ question_text, question_type, creator_user_id });
    await question.save();

    if (question_type === 'MULTIPLE_CHOICE' && Array.isArray(options)) {
      for (const option of options) {
        await new QuestionOption({
          question_id: question._id,
          option_text: option.option_text,
          is_correct: option.is_correct || false,
        }).save();
      }
    }

    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all questions
router.get('/', async (req, res) => {
  const questions = await QuestionBank.find();
  res.json(questions);
});

module.exports = router;
