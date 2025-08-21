// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// --- Middleware
app.use(express.json());

// ✅ Allow frontend requests (for dev & production)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite default port
      "http://127.0.0.1:5173",
      "http://localhost:8080", // if your frontend runs on 8080
      "http://127.0.0.1:8080",
    ],
    credentials: true,
  })
);

// --- DB connection
const connectDB = require("./config/db");
connectDB();

// --- Routes
app.get("/health", (_req, res) => res.json({ ok: true }));

// Auth routes
app.use("/api/auth", require("./routes/auth"));

// --- Serve frontend build only in production
if (process.env.NODE_ENV === "production") {
  const frontendBuild = path.join(__dirname, "frontend", "build");
  app.use(express.static(frontendBuild));

  app.get("*", (req, res) => {
    // Don’t hijack API routes
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ message: "Not found" });
    }
    res.sendFile(path.join(frontendBuild, "index.html"));
  });
}

// --- Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
