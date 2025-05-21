import { useEffect, useRef } from "react";

interface ConfirmModalProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ title, description, onConfirm, onCancel }: ConfirmModalProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="w-full max-w-sm p-6 text-center text-white rounded-lg shadow-xl bg-zinc-800 animate-fade-in">
        <h3 id="confirm-title" className="mb-4 text-lg font-semibold">
          {title}
        </h3>
        {description && <p className="mb-4 text-sm text-gray-300">{description}</p>}

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="w-20 px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            예
          </button>
          <button
            onClick={onCancel}
            ref={cancelButtonRef}
            className="w-20 px-4 py-2 bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;