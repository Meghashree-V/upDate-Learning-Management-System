import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [allowedAttempts, setAllowedAttempts] = useState(1);
  const [questions, setQuestions] = useState([]);

  // Fetch all quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/quizzes");
        setQuizzes(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Create new quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Create questions
      const questionRefs = [];
      for (const q of questions) {
        const resQ = await axios.post("http://localhost:5000/api/questions", {
          question_text: q.text,
          question_type: q.type,
          creator_user_id: "user123",
          options: q.options,
        });

        const questionId = resQ.data._id;
        const correctOpt = q.options.find(o => o.is_correct);
        if (!correctOpt) throw new Error(`Question "${q.text}" has no correct option`);

        questionRefs.push({
          question_id: questionId,
          order: 0,
          correct_answer: correctOpt.option_text
        });
      }

      // 2️⃣ Create quiz with question links
      const payload = {
        course_id: courseId,
        title,
        time_limit: timeLimit,
        allowed_attempts: allowedAttempts,
        questions: questionRefs
      };

      const resQuiz = await axios.post("http://localhost:5000/api/quizzes", payload);

      setQuizzes(prev => [resQuiz.data, ...prev]); // show new quiz at top

      // Reset form
      setCourseId(""); setTitle(""); setTimeLimit(0); setAllowedAttempts(1); setQuestions([]); setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to create quiz");
    }
  };
  // Delete quiz
  const deleteQuiz = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
      setQuizzes(prev => prev.filter(q => q._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete quiz");
    }
  };

  // Question management
  const addQuestion = () => setQuestions(prev => [...prev, { text: "", type: "MULTIPLE_CHOICE", options: [] }]);
  const updateQuestionText = (idx, val) => setQuestions(prev => prev.map((q, i) => i === idx ? { ...q, text: val } : q));
  const addOption = (qIdx) => {
    const newQs = [...questions];
    newQs[qIdx].options.push({ option_text: "", is_correct: false });
    setQuestions(newQs);
  };
  const updateOption = (qIdx, oIdx, val) => {
    const newQs = [...questions];
    newQs[qIdx].options[oIdx].option_text = val;
    setQuestions(newQs);
  };
  const setCorrectOption = (qIdx, oIdx) => {
    const newQs = [...questions];
    newQs[qIdx].options = newQs[qIdx].options.map((o, i) => ({ ...o, is_correct: i === oIdx }));
    setQuestions(newQs);
  };

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 grid gap-6">
      {/* Quiz creation form */}
      <form onSubmit={handleSubmit} className="p-4 border rounded-md grid gap-3 bg-white shadow-sm">
        <h2 className="font-semibold">Create New Quiz</h2>
        <input type="text" placeholder="Course ID" value={courseId} onChange={e => setCourseId(e.target.value)} className="border p-2 rounded" required />
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" required />
        <input type="number" placeholder="Time Limit (mins)" value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))} className="border p-2 rounded" />
        <input type="number" placeholder="Allowed Attempts" value={allowedAttempts} onChange={e => setAllowedAttempts(Number(e.target.value))} className="border p-2 rounded" />

        <div className="grid gap-2">
          <h3 className="font-medium">Questions</h3>
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="border p-2 rounded space-y-2">
              <input type="text" placeholder={`Question ${qIdx + 1}`} value={q.text} onChange={e => updateQuestionText(qIdx, e.target.value)} className="border p-1 w-full" required />
              {q.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center gap-2">
                  <input type="text" placeholder={`Option ${oIdx + 1}`} value={opt.option_text} onChange={e => updateOption(qIdx, oIdx, e.target.value)} className="border p-1 flex-1" required />
                  <label className="flex items-center gap-1">
                    <input type="radio" checked={opt.is_correct} onChange={() => setCorrectOption(qIdx, oIdx)} /> Correct
                  </label>
                </div>
              ))}
              <button type="button" onClick={() => addOption(qIdx)} className="text-blue-600 hover:underline">+ Add Option</button>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="text-green-600 hover:underline">+ Add Question</button>
        </div>

        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Create Quiz</button>
      </form>
      {/* List of existing quizzes */}
      <ul className="space-y-3">
        {quizzes.map(q => (
          <li key={q._id} className="p-4 border rounded-md shadow-sm bg-white flex justify-between items-start">
            <div>
              <h2 className="font-semibold">{q.title}</h2>
              <p>Time Limit: {q.time_limit || 0} mins</p>
              <p>Allowed Attempts: {q.allowed_attempts || 1}</p>
              <Link to={`/quizzes/${q._id}`} className="text-blue-600 hover:underline">Take Quiz</Link>
            </div>
            <button
              onClick={() => deleteQuiz(q._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}
