import Course from "../models/Course.js";

// Create course
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      price,
      instructor,
      level,
      enrollmentType,
      capacity,
      startDate,
      endDate,
      categories,
      lessons,
    } = req.body;

    // Parse arrays (because they come as JSON strings from FormData)
    const parsedCategories = JSON.parse(categories || "[]");
    const parsedLessons = JSON.parse(lessons || "[]");

    const thumbnailPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newCourse = await Course.create({
      title,
      description,
      duration,
      price,
      instructor,
      level,
      enrollmentType,
      capacity,
      startDate,
      endDate,
      categories: parsedCategories,
      lessons: parsedLessons,
      thumbnail: thumbnailPath,
    });

    await newCourse.save();
    res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully", course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
