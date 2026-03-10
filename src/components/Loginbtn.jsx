import { MdOutlinePersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Loginbtn() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-3 right-3 z-[9999]">
      <button
        onClick={() => navigate("/logiformpage")}
        className="bg-ph text-white rounded-[12px] flex items-center gap-2 px-4 py-2 shadow-lg"
      >
        <MdOutlinePersonAdd className="text-xl" />
        <span className="capitalize">login</span>
      </button>
    </div>
  );
}
