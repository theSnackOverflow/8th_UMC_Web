import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;
    const params = new URLSearchParams(location.search);
    params.set('sort_by', sortBy);
    navigate({ pathname: '/', search: params.toString() });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <Link to="/" className="text-2xl font-bold transition text-black-600 hover:text-black-700">
          2ssac
        </Link>
        <select
          onChange={handleSortChange}
          defaultValue="popularity.desc"
          className="px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="popularity.desc">인기순</option>
          <option value="vote_average.desc">평점순</option>
          <option value="release_date.desc">최신순</option>
        </select>
      </header>

      <main className="flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="py-4 text-sm text-center text-gray-400 border-t">
        © 2025 Movie Explorer | Powered by TMDB
      </footer>
    </div>
  );
};

export default Layout;