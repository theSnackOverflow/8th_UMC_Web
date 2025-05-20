import { useState } from "react";
import AddLPModal from "../components/modals/AddLPModal";

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative min-h-screen">
        {/* 페이지 내용 */}

        {/* + 버튼 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed z-50 text-3xl text-white bg-pink-500 rounded-full shadow-lg bottom-8 right-8 w-14 h-14 hover:bg-pink-600"
        >
          +
        </button>

        {/* 모달 */}
        {isModalOpen && <AddLPModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
};

export default MyPage;