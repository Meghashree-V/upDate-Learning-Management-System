import express from "express";
import Enrollment from "../models/Enrollment.js";

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

    const enrollments = await Enrollment.find(filter).sort({ createdAt: 1 });

    // ✅ Send clean data
    const clean = enrollments.map(e => ({
      month: e.month,
      enrollments: e.enrollments,
      revenue: e.revenue,
    }));

    res.json(clean);
  } catch (err) {
    console.error("❌ Enrollment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
