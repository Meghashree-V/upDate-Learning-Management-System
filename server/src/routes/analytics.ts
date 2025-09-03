import express from "express";
import ExcelJS from "exceljs";
import Enrollment from "../models/enrollment";
import Course from "../models/Course";
import User from "../models/User";
import { Parser } from "json2csv";

const router = express.Router();

// 📊 1. Monthly Enrollments & Revenue
router.get("/enrollments", async (req, res) => {
    try {
        const days = req.query.days ? parseInt(req.query.days as string) : null;
        let matchStage = {};
        if (days && !isNaN(days)) {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);
            matchStage = { timestamp: { $gte: startDate } };
        }

        const pipeline: any[] = [];
        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }
        pipeline.push({
            $group: {
                _id: { $month: "$timestamp" },
                enrollments: { $sum: 1 },
                revenue: { $sum: "$price" }
            }
        });
        pipeline.push({ $sort: { "_id": 1 } });

        const enrollments = await Enrollment.aggregate(pipeline);

        res.json(enrollments.map(e => ({
            month: e._id,
            enrollments: e.enrollments,
            revenue: e.revenue
        })));
    } catch (err) {
        res.status(500).json({ message: (err instanceof Error ? err.message : String(err)) });
    }
});

// 📊 2. Course Performance
router.get("/course-performance", async (req, res) => {
    try {
        const data = await Enrollment.aggregate([
            {
                $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "course"
                }
            },
            { $unwind: "$course" },
            {
                $group: {
                    _id: "$course._id",
                    course: { $first: "$course.title" },
                    enrollments: { $sum: 1 },
                    completion: { $avg: "$completionRate" }, // मान लो आपकी schema में है
                    rating: { $avg: "$course.rating" }
                }
            }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: (err instanceof Error ? err.message : String(err)) });
    }
});

// 📊 3. Category Distribution
router.get("/categories", async (req, res) => {
    try {
        const data = await Course.aggregate([
            {
                $group: {
                    _id: "$category",
                    value: { $sum: 1 }
                }
            }
        ]);
        res.json(data.map(c => ({
            name: c._id,
            value: c.value,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16) // random color
        })));
    } catch (err) {
        res.status(500).json({ message: (err instanceof Error ? err.message : String(err)) });
    }
});

// 📊 4. User Activity
router.get("/user-activity", async (req, res) => {
    try {
        const data = await Enrollment.aggregate([
            {
                $group: {
                    _id: { $hour: "$timestamp" },
                    active: { $sum: 1 }
                }
            }
        ]);
        res.json(data.map(a => ({ time: `${a._id}:00`, active: a.active })));
    } catch (err) {
        res.status(500).json({ message: (err instanceof Error ? err.message : String(err)) });
    }
});

// 📊 5. Revenue vs Target
router.get("/revenue", async (req, res) => {
    try {
        const data = await Enrollment.aggregate([
            {
                $group: {
                    _id: { $month: "$timestamp" },
                    revenue: { $sum: "$price" }
                }
            }
        ]);
        res.json(data.map(r => ({
            month: r._id,
            revenue: r.revenue,
            target: 10000 // static target (आप DB में भी रख सकते हो)
        })));
    } catch (err) {
        res.status(500).json({ message: (err instanceof Error ? err.message : String(err)) });
    }
});

// 📊 6. KPI Cards
router.get("/kpis", async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalCourses = await Course.countDocuments();
        const totalRevenue = await Enrollment.aggregate([{ $group: { _id: null, revenue: { $sum: "$price" } } }]);

        res.json([
            { title: "Total Students", value: totalStudents.toString(), change: "+10%", trend: "up", icon: "Users", color: "text-blue-500" },
            { title: "Total Courses", value: totalCourses.toString(), change: "+5%", trend: "up", icon: "BookOpen", color: "text-green-500" },
            { title: "Revenue", value: `₹${totalRevenue[0]?.revenue || 0}`, change: "+15%", trend: "up", icon: "DollarSign", color: "text-yellow-500" },
        ]);
    } catch (err) {
        res.status(500).json({ message: (err instanceof Error ? err.message : String(err)) });
    }
});

// 📊 7. Student Analytics
router.get("/students", async (req, res) => {
    try {
        const newStudents = await User.countDocuments({ role: "student", createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
        const activeStudents = await Enrollment.distinct("userId");
        res.json({
            newStudents,
            activeStudents: activeStudents.length,
            retentionRate: 75
        });
    } catch (err) {
        res.status(500).json({ message: (err instanceof Error ? err.message : String(err)) });
    }
});

// Export Report Endpoint
interface PopulatedEnrollment {
  userId: { firstName?: string; lastName?: string; email?: string };
  courseId: { title?: string; price?: number };
  price: number;
  status: string;
  enrolledAt: Date;
}

router.get("/export-report", async (req, res) => {
  try {
    const { range } = req.query;
    let startDate: Date | null = null;

    // If filter applied
    if (range) {
      const days = parseInt(range as string, 10);
      startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
    }

    const workbook = new ExcelJS.Workbook();

    // 📌 Students Sheet
    const studentsSheet = workbook.addWorksheet("Students");
    studentsSheet.columns = [
      { header: "ID", key: "id", width: 30 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Role", key: "role", width: 15 },
      { header: "Created At", key: "createdAt", width: 25 },
    ];

    const studentQuery: any = {};
    if (startDate) studentQuery.createdAt = { $gte: startDate };

    const students = await User.find(studentQuery).lean();
    students.forEach((s) => {
      studentsSheet.addRow({
        id: s._id,
        name: `${s.firstName || "N/A"} ${s.lastName || "N/A"}`,
        email: s.email,
        role: s.role,
        createdAt: s.createdAt
          ? new Date(s.createdAt).toLocaleString()
          : "N/A",
      });
    });

    // 📌 Courses Sheet
    const coursesSheet = workbook.addWorksheet("Courses");
    coursesSheet.columns = [
      { header: "ID", key: "id", width: 30 },
      { header: "Title", key: "title", width: 30 },
      { header: "Price", key: "price", width: 15 },
      { header: "Start Date", key: "startDate", width: 20 },
      { header: "End Date", key: "endDate", width: 20 },
    ];

    const courseQuery: any = {};
    if (startDate) courseQuery.createdAt = { $gte: startDate };

    const courses = await Course.find(courseQuery).lean();
    courses.forEach((c) => {
      coursesSheet.addRow({
        id: c._id,
        title: c.title,
        price: c.price,
        startDate: c.startDate
          ? new Date(c.startDate).toLocaleDateString()
          : "N/A",
        endDate: c.endDate
          ? new Date(c.endDate).toLocaleDateString()
          : "N/A",
      });
    });

    // 📌 Revenue Sheet
    const revenueSheet = workbook.addWorksheet("Revenue");
    revenueSheet.columns = [
      { header: "User", key: "user", width: 25 },
      { header: "Course", key: "course", width: 30 },
      { header: "Price", key: "price", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "Enrolled At", key: "enrolledAt", width: 25 },
    ];

    const enrollmentQuery: any = {};
    if (startDate) enrollmentQuery.enrolledAt = { $gte: startDate };

    const enrollments = (await Enrollment.find(enrollmentQuery)
      .populate("userId", "firstName lastName email")
      .populate("courseId", "title price")
      .lean()) as unknown as PopulatedEnrollment[];

    enrollments.forEach((e) => {
      revenueSheet.addRow({
        user: e.userId
          ? `${e.userId.firstName || "N/A"} ${e.userId.lastName || "N/A"}`
          : "N/A",
        course: e.courseId?.title || "N/A",
        price: e.price,
        status: e.status,
        enrolledAt: e.enrolledAt
          ? new Date(e.enrolledAt).toLocaleString()
          : "N/A",
      });
    });

    // 📌 Summary Sheet
    const summarySheet = workbook.addWorksheet("Summary");

    const totalStudents = await User.countDocuments(
      startDate ? { role: "student", createdAt: { $gte: startDate } } : {
        role: "student",
      }
    );

    const totalCourses = await Course.countDocuments(
      startDate ? { createdAt: { $gte: startDate } } : {}
    );

    const totalEnrollments = await Enrollment.countDocuments(
      startDate ? { enrolledAt: { $gte: startDate } } : {}
    );

    const totalRevenueAgg = await Enrollment.aggregate([
      ...(startDate ? [{ $match: { enrolledAt: { $gte: startDate } } }] : []),
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    summarySheet.addRow(["Metric", "Value"]);
    summarySheet.addRow(["Total Students", totalStudents]);
    summarySheet.addRow(["Total Courses", totalCourses]);
    summarySheet.addRow(["Total Enrollments", totalEnrollments]);
    summarySheet.addRow(["Total Revenue", totalRevenue]);

    // 📌 Export File
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Report export error:", err);
    res.status(500).json({ message: "Error generating report" });
  }
});



router.get("/revenue-breakdown", async (req, res) => {
  try {
    // Aggregate by Course Category
    const data = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" },
      {
        $group: {
          _id: "$course.category",  
          totalRevenue: { $sum: "$price" },
          enrollments: { $sum: 1 }
        }
      }
    ]);

    // Total Revenue
    const totalAgg = await Enrollment.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    res.json({
      breakdown: data,
      total: totalAgg[0]?.total
    });
  } catch (err) {
    console.error("Revenue breakdown error:", err);
    res.status(500).json({ message: "Failed to fetch revenue breakdown" });
  }
});

// Top revenue generating courses
router.get("/top-revenue-courses", async (req, res) => {
  try {
    const data = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" },
      {
        $group: {
          _id: "$course._id",
          title: { $first: "$course.title" },
          totalRevenue: { $sum: "$price" },
          enrollments: { $sum: 1 }
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 3 } // top 3 courses
    ]);

    res.json(data);
  } catch (err) {
    console.error("Top revenue courses error:", err);
    res.status(500).json({ message: "Failed to fetch top revenue courses" });
  }
});



export default router;
