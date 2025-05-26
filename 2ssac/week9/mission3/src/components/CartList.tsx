import CartItem from "./CartItem";
import Modal from "./Modal";
import { useModalStore } from "../stores/useModalStore";
import { useCartStore } from "../stores/useCartStore";

const CartList = () => {
  const openModal = useModalStore((state) => state.openModal);
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return (
    <div className="max-w-3xl px-4 py-6 mx-auto space-y-4">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">장바구니가 비어 있어요</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} lp={item} />
          ))}

          <div className="flex justify-end mt-4 text-lg font-semibold">
            총 금액: {totalPrice.toLocaleString()}원
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={openModal}
              className="px-6 py-2 text-sm transition border border-gray-700 rounded hover:bg-gray-800 hover:text-white"
            >
              전체 삭제
            </button>
          </div>

          <Modal />
        </>
      )}
    </div>
  );
};

export default CartList;