import { useNavigate } from "react-router";
import { CiShoppingCart } from "react-icons/ci";

export default function Cartbtn() {
  const navigate = useNavigate();
  return (
    <div className="fixed  right-2 z-10 top-160 md:top-210">
      <button
        onClick={() => navigate("/cartpage")}
        className="bg-ph p-4 rounded-[26px] hover:bg-orange-700 duration-300"
      >
        <CiShoppingCart className=" text-white text-4xl " />
      </button>
    </div>
  );
}
