import { Routes, Route, NavLink } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AssignmentsPage from './pages/AssignmentsPage.jsx'
import QuizzesPage from './pages/QuizzesPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import SubmissionsPage from './pages/SubmissionsPage.jsx'
import GradesPage from './pages/GradesPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/quizzes/:id" element={<QuizPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/grades" element={<GradesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
