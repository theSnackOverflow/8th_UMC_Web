import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/auth/useLogout";
import { useMyInfo } from "../hooks/auth/useMyInfo";
type Props = {
  onToggleSidebar: () => void;
};

const Header = ({ onToggleSidebar }: Props) => {
  const { data: user, isLoading } = useMyInfo();
  const isAuthenticated = !!user;
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        alert("로그아웃되었습니다.");
        navigate("/");
      },
      onError: () => {
        alert("로그아웃 실패: 다시 시도해주세요.");
      },
    });
  };

  return (
    <header className="fixed top-0 z-50 flex items-center justify-between w-full px-6 py-4 text-white shadow-md bg-zinc-900">
      <div className="flex items-center gap-4">
        <button className="text-2xl lg:hidden" onClick={onToggleSidebar}>☰</button>
        <Link to="/" className="text-2xl font-bold text-pink-500">돌려돌려LP판</Link>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-xl" title="검색">🔍</button>
        {!isLoading && isAuthenticated ? (
          <>
            <span className="text-sm">{user?.name ?? "사용자"}님 반갑습니다.</span>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="px-4 py-1 text-sm transition border rounded hover:bg-white hover:text-black disabled:opacity-50"
            >
              {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-1 text-sm transition border rounded hover:bg-white hover:text-black">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-1 text-sm text-white transition bg-pink-500 rounded hover:bg-pink-600">회원가입</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;