import { Router, Request, Response } from 'express';
import Course from '../models/Course';
import { upload } from '../middleware/upload';

const router = Router();

// Create course (with file upload)
router.post('/', upload.single('thumbnail'), async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      duration,
      price,
      instructor,
      level,
      enrollmentType,
      capacity,
      startDate,
      endDate,
      categories,
      lessons,
      isFree,
    } = req.body as Record<string, any>;

    const parsedCategories = typeof categories === 'string' ? JSON.parse(categories || '[]') : (categories || []);
    const parsedLessons = typeof lessons === 'string' ? JSON.parse(lessons || '[]') : (lessons || []);

    // Sanitize/coerce inputs
    const numOrUndef = (v: any) => {
      if (v === undefined || v === null || v === '') return undefined;
      const n = Number(v);
      return Number.isNaN(n) ? undefined : n;
    };
    const dateOrUndef = (v: any) => {
      if (!v) return undefined;
      const d = new Date(v);
      return isNaN(d.getTime()) ? undefined : d;
    };
    const boolFromAny = (v: any) => v === true || v === 'true';

    const thumbnailPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newCourse = await Course.create({
      title,
      description,
      duration,
      price: numOrUndef(price),
      instructor,
      level,
      enrollmentType,
      capacity: numOrUndef(capacity),
      startDate: dateOrUndef(startDate),
      endDate: dateOrUndef(endDate),
      categories: parsedCategories,
      lessons: parsedLessons,
      thumbnail: thumbnailPath ?? undefined,
      isFree: boolFromAny(isFree),
    });

    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create course' });
  }
});

// Get all courses
router.get('/', async (_req: Request, res: Response) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch courses' });
  }
});

// Delete course by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json({ message: 'Course deleted successfully', course });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete course' });
  }
});

// Get course by ID (formatted for frontend)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.json({
      id: course._id,
      title: course.title,
      description: course.description,
      category: course.categories?.[0] || 'General',
      price: course.price,
      rating: (course as any).rating || 4.5,
      students: (course as any).students || 0,
      duration: course.duration,
      level: course.level,
      instructor: course.instructor,
      objectives: (course as any).objectives || [],
      curriculum: (course as any).curriculum || course.lessons?.map((l) => l.title) || [],
      image: course.thumbnail ? `http://localhost:5000${course.thumbnail}` : null,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch course' });
  }
});

export default router;
