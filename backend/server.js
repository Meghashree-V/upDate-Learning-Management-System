import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userActivityRoutes from "./routes/userActivityRoutes.js";
import revenueRoutes from "./routes/revenueRoutes.js";
import kpiRoutes from "./routes/kpiRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve(); 
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/reports", reportRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error(err));

// Routes
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/user-activity", userActivityRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/kpis", kpiRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));
// Catch-all (but exclude API routes)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
