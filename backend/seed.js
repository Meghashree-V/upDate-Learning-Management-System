import mongoose from "mongoose";
import dotenv from "dotenv";

import Enrollment from "./models/Enrollment.js";
import Course from "./models/Course.js";
import Category from "./models/Category.js";
import UserActivity from "./models/UserActivity.js";
import Revenue from "./models/Revenue.js";
import Kpi from "./models/Kpi.js";

dotenv.config();

// Utility: return a date relative to today
const daysAgo = (num) => {
  const d = new Date();
  d.setDate(d.getDate() - num);
  return d;
};

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Promise.all([
      Enrollment.deleteMany(),
      Course.deleteMany(),
      Category.deleteMany(),
      UserActivity.deleteMany(),
      Revenue.deleteMany(),
      Kpi.deleteMany(),
    ]);

    // Enrollments (spread across last year)
    await Enrollment.insertMany([
      { month: "Aug", enrollments: 120, revenue: 8400, createdAt: daysAgo(3) },   // 3 days ago
      { month: "Jul", enrollments: 180, revenue: 12600, createdAt: daysAgo(20) }, // 20 days ago
      { month: "Jun", enrollments: 240, revenue: 16800, createdAt: daysAgo(50) }, // 50 days ago
      { month: "Apr", enrollments: 200, revenue: 14000, createdAt: daysAgo(120) },// 4 months ago
      { month: "Jan", enrollments: 90, revenue: 6300, createdAt: daysAgo(250) },  // 8 months ago
    ]);

    // Courses
    await Course.insertMany([
      { course: "React Dev", enrollments: 342, completion: 85, rating: 4.8, createdAt: daysAgo(5) },
      { course: "Python DS", enrollments: 289, completion: 78, rating: 4.7, createdAt: daysAgo(15) },
      { course: "UI/UX Design", enrollments: 234, completion: 92, rating: 4.6, createdAt: daysAgo(40) },
      { course: "Marketing", enrollments: 156, completion: 67, rating: 4.5, createdAt: daysAgo(70) },
      { course: "Machine Learning", enrollments: 198, completion: 74, rating: 4.9, createdAt: daysAgo(150) },
    ]);

    // Categories
    await Category.insertMany([
      { name: "Web Development", value: 35, color: "#DC2626", createdAt: daysAgo(2) },
      { name: "Data Science", value: 25, color: "#EA580C", createdAt: daysAgo(15) },
      { name: "Design", value: 20, color: "#CA8A04", createdAt: daysAgo(45) },
      { name: "Marketing", value: 15, color: "#65A30D", createdAt: daysAgo(100) },
      { name: "Mobile Dev", value: 5, color: "#0D9488", createdAt: daysAgo(200) },
    ]);

    // User Activity
    await UserActivity.insertMany([
      { time: "00:00", active: 12, createdAt: daysAgo(1) },
      { time: "04:00", active: 8, createdAt: daysAgo(1) },
      { time: "08:00", active: 145, createdAt: daysAgo(1) },
      { time: "12:00", active: 280, createdAt: daysAgo(1) },
      { time: "16:00", active: 320, createdAt: daysAgo(1) },
      { time: "20:00", active: 180, createdAt: daysAgo(1) },
    ]);

    // Revenue
    await Revenue.insertMany([
      { month: "Aug", revenue: 22400, target: 20000, createdAt: daysAgo(3) },
      { month: "Jul", revenue: 19600, target: 18000, createdAt: daysAgo(25) },
      { month: "Jun", revenue: 16800, target: 15000, createdAt: daysAgo(60) },
      { month: "Apr", revenue: 14000, target: 13000, createdAt: daysAgo(120) },
      { month: "Jan", revenue: 9000, target: 10000, createdAt: daysAgo(250) },
    ]);

    // KPIs
    await Kpi.insertMany([
      {
        title: "Total Revenue",
        value: "$22,400",
        change: "+15.2%",
        trend: "up",
        icon: "DollarSign",
        color: "text-success",
        createdAt: daysAgo(3),
      },
      {
        title: "Active Students",
        value: "2,847",
        change: "+8.1%",
        trend: "up",
        icon: "Users",
        color: "text-primary",
        createdAt: daysAgo(5),
      },
      {
        title: "Course Completions",
        value: "1,234",
        change: "+12.5%",
        trend: "up",
        icon: "BookOpen",
        color: "text-warning",
        createdAt: daysAgo(20),
      },
      {
        title: "Avg. Session Time",
        value: "24m 32s",
        change: "-2.3%",
        trend: "down",
        icon: "Clock",
        color: "text-destructive",
        createdAt: daysAgo(40),
      },
    ]);

    console.log("🌱 Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seedData();
