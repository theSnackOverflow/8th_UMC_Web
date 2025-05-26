import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useTypedRedux";

const Navbar = () => {
  const amount = useAppSelector((state) => state.cart.amount);

  return (
    <nav className="flex items-center justify-between px-6 py-4 text-white bg-gray-800 shadow">
      <Link to="/" className="text-2xl font-bold">
        2ssac
      </Link>
      <Link to="/cart" className="flex items-center gap-2">
        <span className="text-xl">🛒</span>
        <span className="px-2 py-1 text-sm text-black bg-white rounded-full">
          {amount}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;