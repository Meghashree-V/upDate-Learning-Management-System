import { Router, Request, Response } from 'express';
import Notification from '../models/Notification';
import NotificationRead from '../models/NotificationRead';
import User from '../models/User';
import { AuthRequest, requireAdmin, requireAuth } from '../middleware/auth';

const router = Router();

// Admin: create notification - targets: all | students | admins | specific
router.post('/', requireAuth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, message, target, userIds, courseId } = req.body as any;
    if (!title || !message || !target) return res.status(400).json({ message: 'Missing fields' });

    if (target === 'specific' && (!Array.isArray(userIds) || userIds.length === 0)) {
      return res.status(400).json({ message: 'userIds required for target=specific' });
    }

    const created = await Notification.create({
      title,
      message,
      target,
      userIds: target === 'specific' ? userIds : [],
      courseId: courseId || null,
      createdBy: req.user!.sub,
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create notification' });
  }
});

// Admin: list notifications
router.get('/', requireAuth, requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const items = await Notification.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// Admin: delete notification
router.delete('/:id', requireAuth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Notification not found' });
    await NotificationRead.deleteMany({ notificationId: req.params.id });
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notification' });
  }
});

// User: list my notifications (based on role/target)
router.get('/my', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const me = await User.findById(req.user!.sub).select('role');
    if (!me) return res.status(404).json({ message: 'User not found' });

    const orTargets: any[] = [{ target: 'all' }];
    if (me.role === 'student') orTargets.push({ target: 'students' });
    if (me.role === 'admin') orTargets.push({ target: 'admins' });

    // specific notifications where user is included
    const specifics = await Notification.find({ target: 'specific', userIds: req.user!.sub });
    const general = await Notification.find({ $or: orTargets }).sort({ createdAt: -1 });
    const combined = [...specifics, ...general].sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());

    // mark each with read state
    const readMarks = await NotificationRead.find({ userId: req.user!.sub });
    const readSet = new Set(readMarks.map(r => `${r.notificationId}`));

    const result = combined.map(n => ({
      ...n.toObject(),
      read: readSet.has(String(n._id)),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch my notifications' });
  }
});

// User: mark as read
router.post('/:id/read', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const n = await Notification.findById(req.params.id);
    if (!n) return res.status(404).json({ message: 'Notification not found' });

    await NotificationRead.updateOne(
      { notificationId: req.params.id, userId: req.user!.sub },
      { $set: { readAt: new Date() } },
      { upsert: true }
    );

    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark as read' });
  }
});

export default router;
