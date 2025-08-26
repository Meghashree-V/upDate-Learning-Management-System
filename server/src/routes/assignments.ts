import { Router, Request, Response } from 'express';
import Assignment from '../models/Assignment';
import Submission from '../models/Submission';
import { AuthRequest, requireAdmin, requireAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Shared: list assignments (optionally filter by courseId, published)
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { courseId, published } = req.query as { courseId?: string; published?: string };
    const filter: any = {};
    if (courseId) filter.courseId = courseId;
    if (published !== undefined) filter.published = published === 'true';

    // Students only see published
    if (req.user?.role !== 'admin') filter.published = true;

    const items = await Assignment.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
});

// Shared: get one assignment
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const a = await Assignment.findById(req.params.id);
    if (!a) return res.status(404).json({ message: 'Assignment not found' });
    if (req.user?.role !== 'admin' && !a.published) {
      return res.status(403).json({ message: 'Not accessible' });
    }
    res.json(a);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch assignment' });
  }
});

// Admin: create assignment
router.post('/', requireAuth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, courseId, dueDate, maxScore, published } = req.body as any;
    if (!title || !courseId) return res.status(400).json({ message: 'Missing title or courseId' });

    const created = await Assignment.create({
      title,
      description,
      courseId,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      maxScore,
      published: !!published,
      createdBy: req.user!.sub,
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create assignment' });
  }
});

// Admin: update assignment (schedule/publish etc.)
router.patch('/:id', requireAuth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { dueDate, ...rest } = req.body as any;
    const update: any = { ...rest };
    if (dueDate !== undefined) update.dueDate = dueDate ? new Date(dueDate) : null;

    const updated = await Assignment.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Assignment not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update assignment' });
  }
});

// Admin: delete assignment
router.delete('/:id', requireAuth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Assignment not found' });
    await Submission.deleteMany({ assignmentId: req.params.id });
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete assignment' });
  }
});

// Student: submit answers/file for an assignment
router.post('/:id/submissions', requireAuth, upload.single('file'), async (req: AuthRequest, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || !assignment.published) return res.status(404).json({ message: 'Assignment not available' });

    const answersRaw = (req.body.answers as string) || undefined;
    const answers = answersRaw ? JSON.parse(answersRaw) : undefined;

    const created = await Submission.create({
      assignmentId: assignment.id,
      studentId: req.user!.sub,
      answers,
      file: req.file ? `/uploads/${req.file.filename}` : null,
      status: 'submitted',
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit', error: (err as any)?.message });
  }
});

// Student: view own submission for an assignment
router.get('/:id/my-submission', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const sub = await Submission.findOne({ assignmentId: req.params.id, studentId: req.user!.sub });
    if (!sub) return res.status(404).json({ message: 'No submission' });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submission' });
  }
});

// Admin: list all submissions for assignment
router.get('/:id/submissions', requireAuth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const list = await Submission.find({ assignmentId: req.params.id }).sort({ submittedAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
});

// Admin: grade a submission
router.patch('/:id/submissions/:submissionId/grade', requireAuth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { score, feedback } = req.body as any;
    const updated = await Submission.findByIdAndUpdate(
      req.params.submissionId,
      { score, feedback, status: 'graded', gradedAt: new Date() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Submission not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to grade submission' });
  }
});

export default router;
