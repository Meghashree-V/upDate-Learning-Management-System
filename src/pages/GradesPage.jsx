"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [submissionId, setSubmissionId] = useState("");
  const [graderId, setGraderId] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Fetch all grades
  const fetchGrades = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/grades");

      const enrichedGrades = await Promise.all(
        res.data.map(async (g) => {
          try {
            if (g.submission_id) {
              // ✅ Normal case
              const submissionInfo = await axios.get(
                `http://localhost:5000/api/submissions/${g.submission_id}`
              );

              return {
                ...g,
                quizTitle: submissionInfo.data.quiz_id?.title,
                assignmentTitle: submissionInfo.data.assignment_id?.title,
                total:
                  submissionInfo.data.assignment_id?.points ||
                  submissionInfo.data.quiz_id?.points ||
                  null,
              };
            } else {
              // ⚠️ Agar submission_id nahi hai to direct quiz/assignment se title lo
              return {
                ...g,
                quizTitle: g.quiz_id?.title || null,
                assignmentTitle: g.assignment_id?.title || null,
                total: g.quiz_id?.points || g.assignment_id?.points || null,
              };
            }
          } catch {
            return g;
          }
        })
      );



      setGrades(enrichedGrades);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch grades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  // Submit a grade
  // Submit a grade
  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    if (!graderId) {
      setError("Grader User ID is required");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/grades/${submissionId}/grade`,
        {
          score: Number(score),
          feedback: feedback || "",
          grader_user_id: graderId || "admin1"
        }
      );

      await fetchGrades();

      // Reset form
      setSubmissionId("");
      setGraderId("");
      setScore(0);
      setFeedback("");
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Failed to submit grade");
    }
  };


  if (loading) return <div>Loading grades…</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <section className="grid gap-6 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-red-600">Grades</h1>

      {/* Grade Submission Form */}
      <form onSubmit={handleGradeSubmit} className="space-y-3 border p-4 rounded">
        <h2 className="font-semibold">Submit a Grade</h2>
        <input
          type="text"
          placeholder="Submission ID"
          value={submissionId}
          onChange={(e) => setSubmissionId(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Grader User ID"
          value={graderId}
          onChange={(e) => setGraderId(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Grade
        </button>
      </form>

      {/* Grade List */}
      <div className="grid gap-4">
        {grades.length === 0 && <div className="card p-5">No grades yet.</div>}

        {grades.map((g, i) => (
          <div
            key={g._id || i}
            className="card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border rounded"
          >
            <div>
              <div className="font-semibold">Grade {i + 1}</div>
              <p className="text-sm text-zinc-600 mt-1">
                {g.quizTitle
                  ? `Quiz: ${g.quizTitle}`
                  : g.assignmentTitle
                    ? `Assignment: ${g.assignmentTitle}`
                    : "—"}
              </p>
              {g.feedback && <p className="text-sm mt-1">💬 {g.feedback}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Graded by: {g.grader_user_id} <br />
                At: {new Date(g.graded_at).toLocaleString()}
              </p>
            </div>
            {"score" in g && g.score !== null ? (
              <span className="badge text-white bg-green-600 px-2 py-1 rounded">
                {g.score}
                {g.total ? ` / ${g.total}` : ""} ✅
              </span>
            ) : (
              <span className="badge text-white bg-gray-400 px-2 py-1 rounded">
                Not graded yet
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
