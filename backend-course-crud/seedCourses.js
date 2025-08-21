// seedCourses.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/elearningdb";

const seedCourses = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected for seeding...");

    // Clear existing courses
    await Course.deleteMany();
    console.log("🗑️ Old courses removed");

    // Insert demo courses
    const demoCourses = [
      {
        title: "React for Beginners",
        description: "Learn the fundamentals of React.js and build interactive UIs.",
        duration: "5h 30m",
        price: 49.99,
        instructor: "Jane Doe",
        level: "Beginner",
        enrollmentType: "Self-paced",
        capacity: 100,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        categories: ["Web Development", "JavaScript"],
        lessons: [
          { title: "Introduction to React", duration: "15m", type: "video" },
          { title: "JSX & Components", duration: "45m", type: "video" },
          { title: "Props and State", duration: "40m", type: "video" },
        ],
        thumbnail: "/uploads/sample-react.png",
      },
      {
        title: "Node.js Masterclass",
        description: "Deep dive into Node.js backend development.",
        duration: "8h 10m",
        price: 79.99,
        instructor: "John Smith",
        level: "Intermediate",
        enrollmentType: "Instructor-led",
        capacity: 50,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        categories: ["Backend", "JavaScript"],
        lessons: [
          { title: "Intro to Node.js", duration: "20m", type: "video" },
          { title: "Express Basics", duration: "1h", type: "video" },
          { title: "Building APIs", duration: "1h 20m", type: "video" },
        ],
        thumbnail: "/uploads/sample-node.png",
      },
    ];

    await Course.insertMany(demoCourses);
    console.log("✅ Demo courses inserted!");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
};

seedCourses();
