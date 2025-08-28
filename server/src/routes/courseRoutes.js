import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let filter = {};
    if (req.query.days) {
      const days = Number(req.query.days);
      const date = new Date();
      date.setDate(date.getDate() - days);
      filter = { createdAt: { $gte: date } };
    }

    const courses = await Course.find(filter).sort({ createdAt: 1 });

    const clean = courses.map(c => ({
      course: c.course,
      enrollments: c.enrollments,
      completion: c.completion,
      rating: c.rating,
    }));

    res.json(clean);
  } catch (err) {
    console.error("❌ Course error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
