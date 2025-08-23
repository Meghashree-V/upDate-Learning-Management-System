import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/courses", courseRoutes);

// Connect to MongoDB Atlas
const PORT = process.env.PORT || 5000;

// Example Atlas URI (replace with your actual credentials & cluster info)
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://sayedhassank4:pFXMxckmzRmS4wNV@update-lms.ipb1c1t.mongodb.net/?retryWrites=true&w=majority&appName=UpDate-LMS";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Atlas connection error:", err.message);
    process.exit(1);
  });
