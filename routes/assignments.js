const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Assignment = require('../models/Assignment');
const router = express.Router();

// Uploads folder
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// POST route
router.post('/', upload.single('file'), async (req, res) => {
  console.log('Body:', req.body);
  console.log('File received:', req.file);

  if (!req.file) return res.status(400).json({ error: 'File not received' });

  try {
    const assignment = await Assignment.create({
      course_id: req.body.course_id,
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      points: req.body.points,
      file: req.file.filename,
    });
    res.status(201).json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});
// ===== DELETE: Delete assignment by ID =====
router.delete('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    // Delete file from uploads folder
    if (assignment.file) {
      const filePath = path.join(uploadDir, assignment.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${assignment.file}`);
      }
    }

    // Delete assignment document
    await Assignment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
