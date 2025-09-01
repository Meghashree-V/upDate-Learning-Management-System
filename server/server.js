require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== UPLOADS FOLDER ====================
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 'uploads' directory created.");
}

// ==================== MIDDLEWARES ====================
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(uploadDir)); // serve uploaded files

// ==================== MONGODB CONNECTION ====================
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ==================== ROUTES ====================
// Import route files
const assignmentsRouter = require('./routes/assignments');
const quizzesRouter = require('./routes/quizzes');
const questionsRouter = require('./routes/questions');
const submissionsRouter = require('./routes/submissions');
const gradesRouter = require('./routes/grades');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/studentRoutes');

// Use routes
app.use('/api/assignments', assignmentsRouter);
app.use('/api/quizzes', quizzesRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/grades', gradesRouter);
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);

// ==================== HEALTH CHECK ====================
app.get('/api', (req, res) => res.send('🚀 Assessment Service Backend Running'));
app.get('/', (req, res) => res.send('🎯 Assessment Portal Backend is running'));

// ==================== FALLBACK ROUTE ====================
// If route not found
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ==================== START SERVER ====================
app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));
