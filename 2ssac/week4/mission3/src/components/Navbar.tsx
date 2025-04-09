import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { label: "홈", to: "/" },
    { label: "인기 영화", to: "/movies/popular" },
    { label: "상영 중", to: "/movies/now_playing" },
    { label: "평점 높은", to: "/movies/top-rated" },
    { label: "개봉 예정", to: "/movies/upcoming" },
  ];

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6 text-sm sm:text-base font-medium">
        {navItems.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive
                  ? "text-green-500 font-bold"
                  : "text-gray-500 hover:text-gray-800"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
