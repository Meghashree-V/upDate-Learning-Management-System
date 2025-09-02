import { Router } from "express";
import Course from "../models/Course";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "uploads/" });

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// POST create a new course
router.post("/", upload.single("thumbnail"), async (req, res) => {
  try {
    const data = req.body;
    // Parse JSON fields sent as strings
    if (typeof data.lessons === "string") {
      data.lessons = JSON.parse(data.lessons);
    }
    if (req.file) {
      data.thumbnail = req.file.path;
    }
    const course = new Course(data);
    await course.save();
    res.status(201).json(course);
  } catch (err: any) {
    console.error('Error creating course:', err);
    res.status(400).json({ error: err.message || "Failed to create course" });
  }
});

// DELETE a course by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Course not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

export default router;
