// routes/reportRoutes.js
import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Category from "../models/Category.js";
import UserActivity from "../models/UserActivity.js";
import Revenue from "../models/Revenue.js";
import Kpi from "../models/Kpi.js"; // kept only to export raw sheet
import ExcelJS from "exceljs";

const router = express.Router();

const buildFilter = (days) => {
  if (!days) return {};
  const d = new Date();
  d.setDate(d.getDate() - Number(days));
  return { createdAt: { $gte: d } };
};

const fmtCurrency = (n) => `$${(n || 0).toLocaleString()}`;
const fmtNumber = (n) => (n || 0).toLocaleString();

router.get("/export", async (req, res) => {
  try {
    const { days } = req.query;
    const filter = buildFilter(days);

    // Fetch raw data for detailed sheets
    const [enrollments, courses, categories, userActivity, revenues, kpisRaw] =
      await Promise.all([
        Enrollment.find(filter),
        Course.find(filter),
        Category.find(filter),
        UserActivity.find(filter),
        Revenue.find(filter),
        Kpi.find(filter),
      ]);

    // ---- Derive KPIs exactly like /api/kpis ----
    const [revAgg] = await Revenue.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: "$revenue" }, target: { $sum: "$target" } } },
    ]);
    const revenuesTotal = revAgg?.total || 0;

    const activeStudents = userActivity.reduce((a, r) => a + (r.active || 0), 0);

    const totalEnrollments = courses.reduce((a, c) => a + (c.enrollments || 0), 0);
    const completionsCount = courses.reduce(
      (a, c) => a + (c.enrollments || 0) * ((c.completion || 0) / 100),
      0
    );
    const avgCompletionPct =
      totalEnrollments ? ((completionsCount / totalEnrollments) * 100).toFixed(2) : "0.00";

    const summaryRows = [
      { metric: "Total Revenue", value: fmtCurrency(revenuesTotal), color: "008000" }, // green-ish
      { metric: "Active Students", value: fmtNumber(activeStudents) },
      { metric: "Course Completions (count)", value: fmtNumber(Math.round(completionsCount)) },
      { metric: "Avg Course Completion (%)", value: `${avgCompletionPct}%` },
      { metric: "Avg. Session Time", value: "24m 32s" },
    ];

    // ---- Build workbook
    const wb = new ExcelJS.Workbook();
    wb.creator = "LMS Analytics System";
    wb.created = new Date();

    // Summary sheet
    const summary = wb.addWorksheet("Summary");
    summary.columns = [
      { header: "Metric", key: "metric", width: 34 },
      { header: "Value", key: "value", width: 26 },
    ];
    summary.getRow(1).font = { bold: true };

    summaryRows.forEach((r) => {
      const row = summary.addRow({ metric: r.metric, value: r.value });
      // Optional emphasis for totals
      if (r.metric === "Total Revenue") {
        row.font = { bold: true };
        row.getCell("value").font = { bold: true, color: { argb: "FF008000" } };
      }
    });

    summary.getColumn("value").alignment = { horizontal: "right" };

    // Helper to create data sheets
    const addSheet = (name, docs) => {
      const ws = wb.addWorksheet(name);
      if (docs.length) {
        ws.columns = Object.keys(docs[0]._doc).map((k) => ({ header: k, key: k, width: 20 }));
        docs.forEach((d) => ws.addRow(d._doc));
        ws.getRow(1).font = { bold: true };
      } else {
        ws.addRow(["No data available"]);
      }
    };

    addSheet("Enrollments", enrollments);
    addSheet("Courses", courses);
    addSheet("Categories", categories);
    addSheet("UserActivity", userActivity);
    addSheet("Revenues", revenues);
    addSheet("KPIs (raw)", kpisRaw); // keep raw KPIs for reference

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=report_${days ? days + "days" : "all"}.xlsx`
    );

    await wb.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("❌ Error exporting Excel:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
