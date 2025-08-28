import express from "express";
import Revenue from "../models/Revenue.js";
import Course from "../models/Course.js";

const router = express.Router();

const buildFilter = (days) => {
  if (!days) return {};
  const since = new Date();
  since.setDate(since.getDate() - Number(days));
  return { createdAt: { $gte: since } };
};

// 📊 Revenue trend
router.get("/", async (req, res) => {
  try {
    const filter = buildFilter(req.query.days);
    const revenues = await Revenue.find(filter).sort({ createdAt: 1 });

    const clean = revenues.map(r => ({
      month: r.month,
      revenue: r.revenue,
      target: r.target,
    }));

    res.json(clean);
  } catch (err) {
    console.error("❌ Revenue error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 💰 Revenue breakdown
router.get("/breakdown", async (req, res) => {
  try {
    const filter = buildFilter(req.query.days);
    const revenues = await Revenue.find(filter);

    const total = revenues.reduce((sum, r) => sum + (r.revenue || 0), 0);

    const breakdown = {
      courseSales: Math.round(total * 0.85),
      subscriptions: Math.round(total * 0.1),
      certifications: Math.round(total * 0.05),
      total,
    };

    res.json(breakdown);
  } catch (err) {
    console.error("❌ Breakdown error:", err);
    res.status(500).json({ message: "Error fetching revenue breakdown" });
  }
});

// 🏆 Top revenue courses
router.get("/top-courses", async (req, res) => {
  try {
    const { days, limit = 3 } = req.query;
    const filter = buildFilter(days);
    const courses = await Course.find(filter);

    const avgPrice = 89.99;
    const withRevenue = courses.map(c => ({
      course: c.course,
      revenue: Math.round(c.enrollments * avgPrice),
    }));

    const topCourses = withRevenue
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, Number(limit));

    res.json(topCourses);
  } catch (err) {
    console.error("❌ Top courses error:", err);
    res.status(500).json({ message: "Error fetching top courses" });
  }
});

export default router;
