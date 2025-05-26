import { useCartStore } from "../stores/useCartStore";
import { useModalStore } from "../stores/useModalStore";

const Modal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!isOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 space-y-4 text-center bg-white rounded shadow-lg">
        <p className="text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-100"
            onClick={closeModal}
          >
            아니요
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;