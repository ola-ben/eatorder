import { useNavigate } from "react-router-dom";
import { MdOutlinePersonAdd } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { useAuth } from "../hooks/useAuth";

export default function Loginbtn() {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  const handleClick = () => {
    console.log("Button clicked, loggedIn:", loggedIn);
    const currentStatus = localStorage.getItem("loggedIn") === "true";

    if (currentStatus) {
      navigate("/profile");
    } else {
      navigate("/logiformpage");
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999]">
      <button
        onClick={handleClick}
        className="bg-pc  transition-colors text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
      >
        {loggedIn ? (
          <HiUserCircle className="text-xl" />
        ) : (
          <MdOutlinePersonAdd className="text-xl" />
        )}

        <span>{loggedIn ? "Profile" : "Login"}</span>
      </button>
    </div>
  );
}
