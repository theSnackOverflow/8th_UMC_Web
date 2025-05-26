import { useState } from "react";
import cartItems from "../constants/cartItems";
import { useCartStore } from "../stores/useCartStore";

const ProductList = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const addItem = useCartStore((state) => state.addItem);

  const handleChangeQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const newValue = Math.max((prev[id] ?? 0) + delta, 0);
      return { ...prev, [id]: newValue };
    });
  };

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] ?? 0;
    if (quantity < 1) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: item.id,
        title: item.title,
        singer: item.singer,
        price: Number(item.price),
        image: item.img,
      });
    }

    setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
  };

  return (
    <div className="max-w-3xl px-8 py-6 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">전체 상품</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-4 bg-white border rounded-md shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.img}
                alt={item.title}
                className="object-cover w-20 h-20 rounded"
              />
              <div>
                <h3 className="font-bold truncate max-w-[200px]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.singer}</p>
                <span className="text-sm">
                  {Number(item.price).toLocaleString()}원
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* 수량 조절 */}
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 text-sm font-bold bg-gray-200 rounded"
                  onClick={() => handleChangeQuantity(item.id, -1)}
                >
                  -
                </button>
                <span className="w-6 text-center">
                  {quantities[item.id] ?? 0}
                </span>
                <button
                  className="px-2 py-1 text-sm font-bold bg-gray-200 rounded"
                  onClick={() => handleChangeQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                disabled={(quantities[item.id] ?? 0) === 0}
                className={`px-4 py-2 text-sm rounded ${
                  (quantities[item.id] ?? 0) === 0
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                담기
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;