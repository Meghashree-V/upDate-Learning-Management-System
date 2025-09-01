import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [assignRes, quizRes, gradeRes] = await Promise.all([
        axios.get("http://localhost:5000/api/assignments"),
        axios.get("http://localhost:5000/api/quizzes"),
        axios.get("http://localhost:5000/api/grades"),
      ]);

      setAssignments(assignRes.data || []);
      setQuizzes(quizRes.data || []);
      setGrades(gradeRes.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);



  

  if (loading) return <p>Loading dashboard…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section className="grid gap-6 p-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-red-600">Welcome to Quizt Assessments</h1>
        <p className="mt-2 text-zinc-700">
          Empowering learners and educators with a seamless platform to access courses, complete assignments, take quizzes, and monitor progress — all in an intuitive and user-friendly environment.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="badge">Explore Courses & Assignments: Easily browse your enrolled courses, upcoming assignments, and quizzes.</span>
          <span className="badge">Submit & Track Your Work: Upload assignments, take quizzes, and instantly track your grades and feedback.</span>
          <span className="badge">Built with Modern Tools: Developed with React, Vite, and TailwindCSS for a fast and responsive learning experience.</span>
          <span className="badge">Robust API Integration: Our REST API ensures your data stays synced and secure.</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Assignments</h3>
          <p className="text-sm text-zinc-600 mt-1">
            You have <strong>{assignments.length}</strong> assignments.
          </p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Quizzes</h3>
          <p className="text-sm text-zinc-600 mt-1">
            You have <strong>{quizzes.length}</strong> quizzes to complete.
          </p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Grades</h3>
          <p className="text-sm text-zinc-600 mt-1">
            You have <strong>{grades.length}</strong> graded items.
          </p>
        </div>
      </div>
    </section>
  );
}
