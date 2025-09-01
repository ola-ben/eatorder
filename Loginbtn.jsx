import { MdOutlinePersonAdd } from "react-icons/md";

import { useNavigate } from "react-router";

export default function Loginbtn() {
  const navigate = useNavigate();
  return (
    <section className="font-rubik ml-3 fixed top-2 right-2 z-10 px-2.5">
      <button
        onClick={() => navigate("/logiformpage")}
        className="bg-ph w-22 p-2 text-white rounded-[12px] pl-5.5 capitalize"
      >
        login
      </button>
      <MdOutlinePersonAdd className="text-xl absolute top-1/2 transform -translate-y-2/3  text-white ml-2" />
    </section>
  );
}
