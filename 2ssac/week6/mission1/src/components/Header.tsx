import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  onToggleSidebar: () => void;
};

const Header = ({ onToggleSidebar }: Props) => {
  const { isAuthenticated } = useAuth();
  const nickname = "우주"; // TODO: 실제 사용자 정보로 대체

  return (
    <header className="w-full fixed top-0 z-50 bg-zinc-900 text-white flex items-center justify-between px-6 py-4 shadow-md">
      <div className="flex items-center gap-4">
        <button className="text-2xl lg:hidden" onClick={onToggleSidebar}>
          ☰
        </button>

        <Link to="/" className="text-2xl font-bold text-pink-500">
          돌려돌려LP판
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-xl" title="검색">
          🔍
        </button>

        {isAuthenticated ? (
          <span className="text-sm">{nickname}님 반갑습니다.</span>
        ) : (
          <>
            <Link to="/login">
              <button className="text-sm border px-4 py-1 rounded hover:bg-white hover:text-black transition">
                로그인
              </button>
            </Link>
            <Link to="/signup">
              <button className="text-sm bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600 transition">
                회원가입
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;