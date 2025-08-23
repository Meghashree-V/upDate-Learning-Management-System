import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import userRoutes from './routes/userRoutes';  // ✅ User CRUD routes import

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

// ✅ Health Check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'update-lms-api', time: new Date().toISOString() });
});

// ✅ Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRoutes); // <-- Add User CRUD API

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
