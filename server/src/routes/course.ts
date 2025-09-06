import { Router } from "express";
import Course from "../models/Course";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Multer temp storage
const upload = multer({ dest: "uploads/" });

const router = Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "lessonVideos" }, // multiple videos
  ]),
  async (req, res) => {
    try {
      const data: any = req.body;

      // Parse JSON fields sent as strings
      if (typeof data.lessons === "string") {
        data.lessons = JSON.parse(data.lessons);
      }
      if (typeof data.categories === "string") {
        data.categories = JSON.parse(data.categories);
      }

      // ✅ Handle thumbnail
      if (req.files && (req.files as any).thumbnail) {
        // Case: new file uploaded
        const thumbFile = (req.files as any).thumbnail[0];
        const uploadRes = await cloudinary.uploader.upload(thumbFile.path, {
          folder: "lms/thumbnails",
        });
        data.thumbnail = uploadRes.secure_url;
        fs.unlinkSync(thumbFile.path);
      } else if (data.thumbnail && data.thumbnail.startsWith("http")) {
        // Case: duplicate course → Cloudinary URL already provided
        data.thumbnail = data.thumbnail;
      }

      // ✅ Handle lesson videos
      if (req.files && (req.files as any).lessonVideos) {
        const videoFiles = (req.files as any).lessonVideos;
        for (let i = 0; i < data.lessons.length; i++) {
          if (data.lessons[i].type === "video" && videoFiles[i]) {
            // Case: new video uploaded
            const videoUpload = await cloudinary.uploader.upload(videoFiles[i].path, {
              resource_type: "video",
              folder: "lms/lessons",
            });
            data.lessons[i].videoUrl = videoUpload.secure_url;
            fs.unlinkSync(videoFiles[i].path);
          }
        }
      } else if (data.lessons && Array.isArray(data.lessons)) {
        // Case: duplicate course → lesson video URLs already present
        data.lessons = data.lessons.map((lesson: any) => {
          if (lesson.type === "video" && lesson.videoUrl && lesson.videoUrl.startsWith("http")) {
            return lesson; // keep existing Cloudinary URL
          }
          return lesson;
        });
      }

      const course = new Course(data);
      await course.save();
      res.status(201).json(course);
    } catch (err: any) {
      console.error("Error creating course:", err);
      res.status(400).json({ error: err.message || "Failed to create course" });
    }
  }
);

// DELETE a course by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Course not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course" });
  }
});

export default router;
