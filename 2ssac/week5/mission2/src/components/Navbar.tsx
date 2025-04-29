import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "http://localhost:8000/v1/auth/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      logout(); // 상태 초기화
      navigate("/"); // 홈으로 이동
    } catch (error) {
      console.error("로그아웃 실패", error);
      alert("로그아웃 중 문제가 발생했어요.");
    }
  };

  const navItems = [
    { label: "홈", to: "/" },
    { label: "인기 영화", to: "/movies/popular" },
    { label: "상영 중", to: "/movies/now_playing" },
    { label: "평점 높은", to: "/movies/top-rated" },
    { label: "개봉 예정", to: "/movies/upcoming" },
  ];

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 왼쪽: 네비게이션 항목 */}
        <div className="flex gap-6 text-sm sm:text-base font-medium">
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

        {/* 오른쪽: 로그인 / 로그아웃 / 회원가입 */}
        <div className="flex items-center gap-3 text-sm">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="border px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="border px-4 py-1 rounded hover:bg-gray-100 transition">
                  로그인
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition">
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;