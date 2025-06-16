import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const sortOptions = [
  { value: 'popularity.desc', label: '인기순' },
  { value: 'vote_average.desc', label: '평점순' },
  { value: 'release_date.desc', label: '최신순' },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const currentSortBy = params.get('sort_by') ?? 'popularity.desc';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    params.set('sort_by', e.target.value);
    navigate({ pathname: '/', search: params.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <Link
          to="/"
          className="text-2xl font-bold text-black transition hover:text-blue-600"
        >
          2ssac
        </Link>
        <select
          value={currentSortBy}
          onChange={handleSortChange}
          className="px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {sortOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
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