import { useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRequestDelete: () => void;
};

const Sidebar = ({ isOpen, onClose, onRequestDelete }: Props) => {
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 w-64 h-screen bg-zinc-900 text-white px-6 py-8 transition-transform duration-300 flex flex-col justify-between",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:static lg:translate-x-0 lg:w-64"
      )}
    >
      {/* 상단 메뉴 */}
      <nav className="flex flex-col gap-6">
        <div
          className="flex items-center gap-2 text-lg cursor-pointer hover:text-pink-400"
          onClick={() => {
            navigate("/search");
            onClose(); // 모바일에서 사이드바 닫기
          }}
        >
          <span>🔍</span>
          <span>찾기</span>
        </div>
        <div
          className="flex items-center gap-2 text-lg cursor-pointer hover:text-pink-400"
          onClick={() => {
            navigate("/mypage");
            onClose(); // 모바일에서 사이드바 닫기
          }}
        >
          <span>👤</span>
          <span>마이페이지</span>
        </div>
      </nav>

      {/* 하단 메뉴 */}
      <div className="flex flex-col gap-4 text-sm text-gray-400">
        <button
          onClick={onRequestDelete}
          className="text-left cursor-pointer hover:text-red-400"
        >
          탈퇴하기
        </button>
        <button
          className="text-left lg:hidden hover:text-red-400"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;