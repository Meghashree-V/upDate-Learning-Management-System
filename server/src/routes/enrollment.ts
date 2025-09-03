import express from "express";
import Enrollment from "../models/enrollment";

const router = express.Router();

// Enroll a user
router.post("/", async (req, res) => {
  try {
    const { userId, courseId, price } = req.body;

    // check if already enrolled
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course." });
    }

    const enrollment = new Enrollment({
      userId,
      courseId,
      price
    });

    await enrollment.save();
    res.status(201).json({ message: "Enrollment successful", enrollment });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: String(err) });
    }
  }
});

export default router;
