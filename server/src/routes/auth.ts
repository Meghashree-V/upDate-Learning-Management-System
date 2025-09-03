import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

// Helper to sign JWT
function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// POST /api/auth/signup (student only)
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashed,
      role: 'student',
    });

    const token = signToken({ sub: user.id, role: user.role });
    return res.status(201).json({ token, role: user.role, user: { id: user._id, firstName, lastName, email } });
  } catch (err) {
    console.error('Signup error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/auth/signin (student + educator in future, for now users)
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ sub: user.id, role: user.role });
    return res.json({
      token,
      role: user.role,
      _id: user._id,   // 🔥 direct root level पर भेजा
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Signin error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/auth/admin/signin (only admins)
router.post('/admin/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    const user = await User.findOne({ email: email.toLowerCase(), role: 'admin' });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ sub: user.id, role: user.role });
    return res.json({ token, role: user.role, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
  } catch (err) {
    console.error('Admin signin error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET all students
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

export default router;
