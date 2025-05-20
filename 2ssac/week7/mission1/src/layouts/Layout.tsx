import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

import AddLPButton from "../components/buttons/AddLPButton";
import AddLPModal from "../components/modals/AddLPModal";

const Layout = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-white bg-black">
      {/* 헤더 */}
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      {/* 사이드바 + 메인 */}
      <div className="flex pt-16">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 p-6">
          <Outlet context={{ order, setOrder }} />
        </main>
      </div>

      {/* LP 추가 버튼 (fixed로 항상 우측 하단에 보이게) */}
      <AddLPButton onClick={() => setIsModalOpen(true)} />

      {/* 모달 */}
      {isModalOpen && <AddLPModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Layout;