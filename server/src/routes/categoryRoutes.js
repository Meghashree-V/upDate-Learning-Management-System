import express from "express";
import Category from "../models/Category.js";

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

    const categories = await Category.find(filter);

    const clean = categories.map(cat => ({
      name: cat.name,
      value: cat.value,
      color: cat.color,
    }));

    res.json(clean);
  } catch (err) {
    console.error("❌ Category error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
