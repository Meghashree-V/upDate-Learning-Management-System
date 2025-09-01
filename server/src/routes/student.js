const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz'); 
const Assignment = require('../models/Assignment'); 
const authMiddleware = require('../middlewares/auth');

router.get('/quizzes', authMiddleware, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Forbidden' });
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

router.get('/assignments', authMiddleware, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Forbidden' });
  const assignments = await Assignment.find();
  res.json(assignments);
});

// Assignment submit or quiz attempt ke liye bhi POST routes add ho sakte hain
module.exports = router;
