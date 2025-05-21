import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AddLPButton from "../components/buttons/AddLPButton";
import AddLPModal from "../components/modals/AddLPModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import { useDeleteUser } from "../hooks/auth/useDeleteUser";
import { useState } from "react";

const Layout = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteUser = useDeleteUser();

  const handleUserDelete = () => {
    deleteUser.mutate(undefined, {
      onSuccess: () => {
        alert("탈퇴되었습니다.");
        localStorage.clear();
        window.location.href = "/login";
      },
      onError: () => {
        alert("탈퇴 실패: 다시 시도해주세요.");
      },
    });
  };

  return (
    <div className="relative min-h-screen text-white bg-black">
      {/* ConfirmModal 전역 처리 */}
      {showConfirm && (
        <ConfirmModal
          title="정말 탈퇴하시겠습니까?"
          onConfirm={() => {
            handleUserDelete();
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* 헤더 */}
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      {/* 사이드바 + 메인 */}
      <div className="flex pt-16">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onRequestDelete={() => setShowConfirm(true)}
        />
        <main className="flex-1 p-6">
          <Outlet context={{ order, setOrder }} />
        </main>
      </div>

      {/* LP 추가 버튼 */}
      <AddLPButton onClick={() => setIsModalOpen(true)} />

      {/* LP 모달 */}
      {isModalOpen && <AddLPModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Layout;