import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import authRouter from './routes/auth';
import coursesRouter from './routes/courses';
import usersRouter from './routes/userRoutes';
import assignmentsRouter from './routes/assignments';
import quizzesRouter from './routes/quizzes';
import gradesRouter from './routes/grades';
import submissionsRouter from './routes/submissions';
import notificationsRouter from './routes/notifications';
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userActivityRoutes from "./routes/userActivityRoutes.js";
import revenueRoutes from "./routes/revenueRoutes.js";
import kpiRoutes from "./routes/kpiRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";




const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment');
  process.exit(1);
}

const app = express();

// ✅ Middlewares
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
  ],
  credentials: false,
}));
app.use(express.json());

// Static serving for uploaded files (thumbnails, etc.)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'update-lms-api', time: new Date().toISOString() });
});

// ✅ Routes
app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/quizzes', quizzesRouter );
app.use('/api/grades', gradesRouter );
app.use('/api/submissions', submissionsRouter );
app.use('/api/notifications', notificationsRouter);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/user-activity", userActivityRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/kpis", kpiRoutes);
app.use("/api/reports", reportRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// ✅ Start Server
async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 API server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Mongo connection error:', err);
    process.exit(1);
  }
}

start();
