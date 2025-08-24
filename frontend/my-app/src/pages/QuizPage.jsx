import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quizzes/${id}/questions`);
        setQuiz({ title: res.data.title || "Quiz" });
        setQuestions(res.data.questions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (qId, optText) => setAnswers(prev => ({ ...prev, [qId]: optText }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setMsg(null);

    const payload = {
      user_id: "user123",
      answers: questions.map(q => ({ questionId: q._id, answer: answers[q._id] || "" }))
    };

    try {
      const res = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, payload);
      setMsg({ type: "success", text: `Submitted! Score: ${res.data.score}/${res.data.total}` });
    } catch (err) {
      setMsg({ type: "error", text: err.response?.data?.error || err.message });
    }

    setSubmitting(false);
  };

  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <section className="grid gap-4">
      <h1 className="text-xl font-bold">{quiz.title}</h1>
      {questions.map((q, idx) => (
        <div key={q._id} className="card p-5 border rounded">
          <div className="font-semibold">Q{idx+1}. {q.text || q.question_text}</div>
          <div className="mt-3 grid gap-2">
            {q.options.map(opt => (
              <label key={opt._id || opt.text} className="flex items-center gap-2">
                <input type="radio" name={`q-${q._id}`} value={opt.text} checked={answers[q._id]===opt.text} onChange={()=>handleChange(q._id,opt.text)}/>
                {opt.text || opt.option_text}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="btn mt-3" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Answers"}
      </button>
      {msg && <p className={msg.type==="error"?"text-red-600":"text-green-600"}>{msg.text}</p>}
    </section>
  );
}
