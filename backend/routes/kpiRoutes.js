import express from "express";
import Revenue from "../models/Revenue.js";
import UserActivity from "../models/UserActivity.js";
import Course from "../models/Course.js";

const router = express.Router();

const buildFilter = (days) => {
  if (!days) return {};
  const d = new Date();
  d.setDate(d.getDate() - Number(days));
  return { createdAt: { $gte: d } };
};

router.get("/", async (req, res) => {
  try {
    const { days } = req.query;
    const filter = buildFilter(days);

    // Revenue totals
    const [revAgg] = await Revenue.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: "$revenue" }, target: { $sum: "$target" } } },
    ]);
    const totalRevenue = revAgg?.total || 0;

    // Active students
    const activity = await UserActivity.find(filter);
    const activeStudents = activity.reduce((sum, a) => sum + a.active, 0);

    // Course completions
    const courses = await Course.find(filter);
    const completions = courses.reduce(
      (sum, c) => sum + (c.enrollments * (c.completion / 100)),
      0
    );

    // Build KPI cards
    const kpis = [
      {
        title: "Total Revenue",
        value: `$${totalRevenue.toLocaleString()}`,
        change: "+15.2%", // you can calculate vs. previous period if needed
        trend: "up",
        icon: "DollarSign",
        color: "text-success",
      },
      {
        title: "Active Students",
        value: activeStudents.toLocaleString(),
        change: "+8.1%",
        trend: "up",
        icon: "Users",
        color: "text-primary",
      },
      {
        title: "Course Completions",
        value: completions.toFixed(0),
        change: "+12.5%",
        trend: "up",
        icon: "BookOpen",
        color: "text-warning",
      },
    ];

    res.json(kpis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching KPIs" });
  }
});

export default router;
