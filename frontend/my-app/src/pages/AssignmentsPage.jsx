import { useEffect, useState } from 'react'
import { safeGet, safePost } from '../api.js'
import axios from 'axios'

export default function AssignmentsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    file: null
  })
  const [filePreview, setFilePreview] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(null)

  // Fetch assignments
  useEffect(() => {
    (async () => {
      const [data, err] = await safeGet('/assignments')
      if (err) setError(err)
      if (data) setItems(Array.isArray(data) ? data : data.items || [])
      setLoading(false)
    })()
  }, [])

  // Handle input changes
  const handleChange = e => {
    const { name, value, files } = e.target
    if (name === 'file') {
      const file = files[0]
      setForm(prev => ({ ...prev, file }))
      if (file && file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file))
      } else {
        setFilePreview(null)
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  // Submit new assignment
  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitLoading(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    const formData = new FormData()
    formData.append('course_id', '12345')
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('due_date', form.dueDate)
    formData.append('points', '10')
    if (form.file) formData.append('file', form.file)

    const [data, err] = await safePost('/assignments', formData)
    if (err) setSubmitError(err)
    if (data) {
      setItems(prev => [data, ...prev])
      setSubmitSuccess('Assignment submitted successfully!')
      setForm({ title: '', description: '', dueDate: '', file: null })
      setFilePreview(null)
    }
    setSubmitLoading(false)
  }

  if (loading) return <div>Loading assignments…</div>
  if (error) return <div className="text-red-600">Error: {typeof error === 'string' ? error : JSON.stringify(error)}</div>

  return (
    <section className="grid gap-6 p-6">
      <h1 className="text-xl font-bold text-red-600">Assignments</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-5 flex flex-col gap-4 border border-zinc-200 rounded">
        <h2 className="font-semibold text-lg">Submit New Assignment</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Image Preview */}
        {filePreview && (
          <div className="mt-2">
            <p className="text-sm text-zinc-600">Image Preview:</p>
            <img src={filePreview} alt="Preview" className="max-w-xs max-h-60 border rounded mt-1" />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={submitLoading}
        >
          {submitLoading ? "Submitting…" : "Submit Assignment"}
        </button>

        {submitError && <p className="text-red-600">{submitError}</p>}
        {submitSuccess && <p className="text-green-600">{submitSuccess}</p>}
      </form>

      {/* Existing assignments */}
      <div className="grid gap-4">
        {items.length === 0 && <div className="card p-5">No assignments found.</div>}

        {items.map((a, i) => (
          <div key={a._id || i} className="card p-5 border rounded">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">{a.title || `Assignment ${i + 1}`}</h3>
                {a.description && <p className="text-sm text-zinc-600 mt-1">{a.description}</p>}
                {a.due_date && (
                  <p className="text-sm mt-1">
                    <span className="bg-zinc-100 px-2 py-1 rounded">
                      Due: {new Date(a.due_date).toLocaleString()}
                    </span>
                  </p>
                )}
                {a.file && a.file.match(/\.(jpeg|jpg|png|gif)$/i) && (
                  <img
                    src={a.file.startsWith("http") ? a.file : `http://localhost:5000/uploads/${a.file}`}
                    alt={a.title}
                    className="mt-2 max-w-xs max-h-60 border rounded"
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                {/* Download for non-image files */}
                {a.file && (
                  <a
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    href={a.file.startsWith("http") ? a.file : `http://localhost:5000/uploads/${a.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                )}

                {/* Delete button */}
                <button
                  onClick={async () => {
                    if (!confirm('Are you sure you want to delete this assignment?')) return;
                    try {
                      await axios.delete(`http://localhost:5000/api/assignments/${a._id}`);
                      setItems(prev => prev.filter(item => item._id !== a._id));
                    } catch (err) {
                      alert('Failed to delete assignment: ' + (err.response?.data?.error || err.message));
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
