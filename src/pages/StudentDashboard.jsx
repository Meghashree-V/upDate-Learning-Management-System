// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api'; // your axios instance

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    api.get('/student/quizzes')
      .then(r => {
        // ensure questions is always an array
        const data = r.data.map(q => ({
          ...q,
          questions: q.questions || []
        }));
        setQuizzes(data);
      })
      .catch(console.error);

    api.get('/student/assignments')
      .then(r => setAssignments(r.data))
      .catch(console.error);
  }, []);

  function attemptQuiz(quiz) {
    setSelectedQuiz(quiz);
  }

  function submitAttempt(quizId) {
    // TODO: collect answers from UI, placeholder empty
    api.post(`/student/quizzes/${quizId}/attempt`, { answers: [] })
      .then(() => {
        alert('Attempt submitted');
        setSelectedQuiz(null);
      })
      .catch(() => alert('Error submitting'));
  }

  function submitAssignment(id) {
    api.post(`/student/assignments/${id}/submit`, { submissionText: 'My answer' })
      .then(() => alert('Submitted'))
      .catch(() => alert('Error'));
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Student Dashboard</h1>

      {/* Quizzes Section */}
      <section>
        <h2>Quizzes</h2>
        {quizzes.length > 0 ? (
          quizzes.map(q => (
            <div key={q._id || q.id} style={{ marginBottom: 8 }}>
              <b>{q.title}</b>
              <button onClick={() => attemptQuiz(q)} style={{ marginLeft: 8 }}>
                Attempt
              </button>
            </div>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </section>

      {/* Assignments Section */}
      <section>
        <h2>Assignments</h2>
        {assignments.length > 0 ? (
          assignments.map(a => (
            <div key={a._id || a.id} style={{ marginBottom: 8 }}>
              <b>{a.title}</b>
              <p>{a.description}</p>
              <button onClick={() => submitAssignment(a._id || a.id)}>
                Submit
              </button>
            </div>
          ))
        ) : (
          <p>No assignments available</p>
        )}
      </section>

      {/* Selected Quiz Modal */}
      {selectedQuiz && (
        <div style={{ border: '1px solid #ccc', padding: 12, marginTop: 12 }}>
          <h3>{selectedQuiz.title}</h3>

          {selectedQuiz?.questions?.length > 0 ? (
            selectedQuiz.questions.map((ques, i) => (
              <div key={ques._id || i} style={{ marginBottom: 6 }}>
                <p>{ques.question_text}</p>
                {/* you can add input for answer here */}
              </div>
            ))
          ) : (
            <p>No questions available</p>
          )}

          <button
            onClick={() => submitAttempt(selectedQuiz._id || selectedQuiz.id)}
            style={{ marginRight: 8 }}
          >
            Submit Attempt
          </button>
          <button onClick={() => setSelectedQuiz(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
