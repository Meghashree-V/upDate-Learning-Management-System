import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';
import { AuthRequest, requireAdmin, requireAuth } from '../middleware/auth';

const router = Router();

// Authenticated user's own profile (view only)
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const me = await User.findById(req.user!.sub).select('-password');
    if (!me) return res.status(404).json({ message: 'User not found' });
    return res.json(me);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// Admin: list users
router.get('/', requireAuth, requireAdmin, async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Admin: get user by id
router.get('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// Admin: create user
router.post('/', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body as Partial<IUser> & { password?: string };
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const created = await User.create({
      firstName,
      lastName,
      email: String(email).toLowerCase(),
      phone,
      password: hashed,
      role: role || 'student',
    });

    const safe = await User.findById(created._id).select('-password');
    return res.status(201).json(safe);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create user' });
  }
});

// Admin: update user
router.patch('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { password, email, ...rest } = req.body as any;

    const update: any = { ...rest };
    if (email) update.email = String(email).toLowerCase();
    if (password) update.password = await bcrypt.hash(password, 10);

    const updated = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ message: 'User not found' });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update user' });
  }
});

// Admin: delete user
router.delete('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User deleted', user: deleted });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;
