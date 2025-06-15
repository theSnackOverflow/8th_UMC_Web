import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-600">Mission App</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/detail" className="text-gray-700 hover:text-blue-500">Detail</Link>
        </nav>
      </header>

      <main className="p-6">
        <Outlet />
      </main>

      <footer className="py-4 text-sm text-center text-gray-400">
        © 2025 Mission App
      </footer>
    </div>
  )
}

export default Layout