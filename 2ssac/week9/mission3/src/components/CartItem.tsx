import { useCartStore } from "../stores/useCartStore";
import type { LP } from "../types/lp";
// import { shallow } from "zustand/shallow";

type Props = {
  lp: LP;
};

const CartItem = ({ lp }: Props) => {
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrease = () => increase(lp.id);
  const handleDecrease = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
    } else {
      decrease(lp.id);
    }
  };

  return (
    <div className="flex items-center justify-between max-w-3xl p-4 mx-auto border-b border-gray-300">
      <div className="flex items-center gap-4">
        <img
          src={lp.image}
          alt={lp.title}
          className="object-cover w-20 h-20 rounded"
        />
        <div>
          <h3 className="text-lg font-semibold">{lp.title}</h3>
          <p className="text-sm text-gray-500">{lp.singer}</p>
          <p className="text-sm text-gray-600">{lp.price.toLocaleString()}원</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <span>{lp.amount}</span>
        <button
          onClick={handleIncrease}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;