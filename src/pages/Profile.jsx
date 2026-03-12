import { useNavigate } from "react-router-dom";
import {
  HiUser,
  HiLockClosed,
  HiGift,
  HiMapPin,
  HiQuestionMarkCircle,
  HiTrash,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fullName = user.fullName || "Guest User";
  const email = user.email || "No email";

  const tribeId = "S304103";

  const logout = () => {
    localStorage.removeItem("loggedIn");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  const menu = [
    {
      name: "Profile Details",
      icon: HiUser,
      action: () => alert("Profile details coming soon"),
    },
    {
      name: "Login Details",
      icon: HiLockClosed,
      action: () => alert("Login details coming soon"),
    },
    {
      name: "Referrals",
      icon: HiGift,
      action: () => alert("Referrals coming soon"),
    },
    {
      name: "Addresses",
      icon: HiMapPin,
      action: () => alert("Addresses coming soon"),
    },
    {
      name: "FAQs",
      icon: HiQuestionMarkCircle,
      action: () => alert("FAQs coming soon"),
    },
    {
      name: "Delete Account",
      icon: HiTrash,
      action: () => {
        localStorage.clear();
        navigate("/");
      },
    },
    {
      name: "Log Out",
      icon: HiArrowRightOnRectangle,
      action: logout,
    },
  ];

  return (
    <section className="bg-gray-100 min-h-screen font-montserrat">
      <div className="max-w-md mx-auto bg-white min-h-screen">

        {/* Profile Header */}
        <div className="flex flex-col items-center pt-10 pb-6">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-white text-4xl">
            <HiUser />
          </div>

          {/* Name */}
          <h2 className="text-xl font-semibold mt-3">{fullName}</h2>

          {/* Badges */}
          <div className="flex gap-3 mt-3">

            <div className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm">
              TRIBE ID: {tribeId}
            </div>

            <div className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm">
              <FaStar />
              4.9
            </div>

          </div>
        </div>

        {/* Menu */}
        <div className="px-4">

          {menu.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                onClick={item.action}
                className="flex items-center justify-between w-full py-4 border-b border-gray-200"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <Icon className="text-xl" />
                  <span>{item.name}</span>
                </div>

                <span className="text-gray-400">›</span>
              </button>
            );
          })}
        </div>

        {/* App version */}
        <p className="text-center text-gray-400 text-sm mt-10 pb-6">
          v1.0.15
        </p>

      </div>
    </section>
  );
}