import express from "express";
import UserActivity from "../models/UserActivity.js";

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

    const activity = await UserActivity.find(filter).sort({ createdAt: 1 });

    const clean = activity.map(a => ({
      time: a.time,
      active: a.active,
    }));

    res.json(clean);
  } catch (err) {
    console.error("❌ User activity error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
