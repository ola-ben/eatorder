import { useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../context/CartContext";

export default function Cartbtn() {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Total count of items
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed right-4 z-50 bottom-8 md:bottom-10 lg:bottom-12">
      <button
        onClick={() => navigate("/cartpage")}
        className="relative bg-ph p-4 rounded-[17.5px] hover:bg-orange-700 duration-300"
      >
        <CiShoppingCart className="text-white text-4xl" />

        {totalCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {totalCount}
          </span>
        )}
      </button>
    </div>
  );
}
