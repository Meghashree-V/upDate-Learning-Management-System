import express from "express";
import { createCourse, getCourses, deleteCourse } from "../controllers/courseController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Create course (with file upload)
router.post("/", upload.single("thumbnail"), createCourse);

// Get all courses
router.get("/", getCourses);

// ✅ Delete a course by ID
router.delete("/:id", deleteCourse);

export default router;
