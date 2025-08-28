import { NavLink } from 'react-router-dom'

export default function Layout({ children }){
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-red-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-brand.red flex items-center justify-center text-white font-bold">Q</div>
            <div className="font-extrabold text-xl"><span className="text-brand.red">Quizt</span> Assessments</div>
          </div>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={({isActive})=> 'px-3 py-2 rounded-xl ' + (isActive ? 'text-brand.red font-semibold' : 'text-zinc-700 hover:text-brand.red')}>Home</NavLink>
            <NavLink to="/assignments" className={({isActive})=> 'px-3 py-2 rounded-xl ' + (isActive ? 'text-brand.red font-semibold' : 'text-zinc-700 hover:text-brand.red')}>Assignments</NavLink>
            <NavLink to="/quizzes" className={({isActive})=> 'px-3 py-2 rounded-xl ' + (isActive ? 'text-brand.red font-semibold' : 'text-zinc-700 hover:text-brand.red')}>Quizzes</NavLink>
            <NavLink to="/submissions" className={({isActive})=> 'px-3 py-2 rounded-xl ' + (isActive ? 'text-brand.red font-semibold' : 'text-zinc-700 hover:text-brand.red')}>Submissions</NavLink>
            <NavLink to="/grades" className={({isActive})=> 'px-3 py-2 rounded-xl ' + (isActive ? 'text-brand.red font-semibold' : 'text-zinc-700 hover:text-brand.red')}>Grades</NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-red-100 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-zinc-600">
          © {new Date().getFullYear()} Quizt Assessments
        </div>
      </footer>
    </div>
  )
}
