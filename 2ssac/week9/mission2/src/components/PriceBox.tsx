import { useAppSelector } from "../hooks/useTypedRedux";

const PriceBox = () => {
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  return (
    <div className="flex items-center justify-between p-4 text-black bg-gray-100 border rounded-md">
      <span className="text-lg font-semibold">총 가격</span>
      <span className="text-xl font-bold">
      {typeof totalPrice === "number" ? totalPrice.toLocaleString() : "0"}원
    </span>
    </div>
  );
};

export default PriceBox;