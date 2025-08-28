import { useEffect, useState } from 'react'
import axios from 'axios'

export default function SubmissionsPage() {
  const [assignments, setAssignments] = useState([])
  const [quizSubs, setQuizSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('assignments') // "assignments" or "quizzes"

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch assignments
        const assignmentsRes = await axios.get('http://localhost:5000/api/assignments')
        setAssignments(assignmentsRes.data)

        // Fetch quiz submissions
        const submissionsRes = await axios.get('http://localhost:5000/api/submissions')
        const quizSubmissions = submissionsRes.data.filter(s => s.quiz_id)
        setQuizSubs(quizSubmissions)

      } catch (err) {
        console.error(err)
        setError(err.response?.data?.error || err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return
    try {
      await axios.delete(`http://localhost:5000/api/submissions/${id}`)
      setQuizSubs(prev => prev.filter(s => s._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete submission')
    }
  }

  if (loading) return <div>Loading…</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  const renderAssignments = () => (
    assignments.length === 0
      ? <div className="card p-5">No assignments found.</div>
      : assignments.map((a, i) => {
        const isImage = a.file?.match(/\.(jpeg|jpg|png|gif)$/i)
        const fileUrl = a.file?.startsWith('http') ? a.file : `http://localhost:5000/uploads/${a.file}`
        return (
          <div key={a._id || i} className="card p-5 border rounded flex flex-col md:flex-row justify-between items-start mb-3 gap-4">
            <div>
              <div className="font-semibold">{a.title || `Assignment ${i + 1}`}</div>
              {a.description && <p className="text-sm text-zinc-600 mt-1">{a.description}</p>}
              {a.due_date && <p className="text-xs text-zinc-500 mt-1">Due: {new Date(a.due_date).toLocaleString()}</p>}

              {/* Image preview */}
              {isImage && (
                <img
                  src={fileUrl}
                  alt={a.title}
                  className="mt-2 max-w-xs max-h-60 border rounded"
                />
              )}
            </div>

            {/* Download button for all files */}
            {a.file && (
              <a
                href={fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2 md:mt-0"
              >
                Download
              </a>
            )}
          </div>
        )
      })
  )

  const renderQuizSubmissions = () => (
    quizSubs.length === 0
      ? <div className="card p-5">No quiz submissions found.</div>
      : quizSubs.map((s, i) => (
        <div key={s._id || i} className="card p-5 border rounded flex justify-between items-start mb-3">
          <div>
            <div className="font-semibold">Quiz: {s.quiz_id?.title || 'Untitled'}</div>
            {s.submitted_at && (
              <p className="text-xs text-zinc-500 mt-1">
                Submitted at: {new Date(s.submitted_at).toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 items-end">
            <span className="badge">
              {s.score !== null && s.total !== null ? `Score: ${s.score}/${s.total}` : 'Not yet graded'}
            </span>

            <button
              onClick={() => handleDelete(s._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))
  )

  return (
    <section className="grid gap-6 p-6">
      <h1 className="text-xl font-bold text-red-600">Submissions</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'assignments' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'quizzes' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('quizzes')}
        >
          Quizzes
        </button>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'assignments' && renderAssignments()}
        {activeTab === 'quizzes' && renderQuizSubmissions()}
      </div>
    </section>
  )
}
