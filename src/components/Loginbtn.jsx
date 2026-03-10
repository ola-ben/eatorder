import { useNavigate } from "react-router-dom";
import { MdOutlinePersonAdd } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";

export default function Loginbtn() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const status = localStorage.getItem("loggedIn");
      setLoggedIn(status === "true");
    };

    // check on load
    checkLogin();

    // listen for login change
    window.addEventListener("authChanged", checkLogin);

    return () => {
      window.removeEventListener("authChanged", checkLogin);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999]">
      <button
        onClick={() => navigate(loggedIn ? "/profile" : "/logiformpage")}
        className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
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
