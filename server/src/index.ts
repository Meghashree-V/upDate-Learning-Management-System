import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import educatorRouter from './routes/educator';
import courseRouter from './routes/course';
import enrollmentRoutes from "./routes/enrollment";
import analyticsRouter from "./routes/analytics";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment');
  process.exit(1);
}

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
  ],
  credentials: false,
}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'update-lms-api', time: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api/educators', educatorRouter);
app.use('/api/courses', courseRouter);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/analytics", analyticsRouter);


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
