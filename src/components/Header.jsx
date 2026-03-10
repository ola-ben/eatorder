import { MdOutlinePersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegClock, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

export default function Header() {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.stopPropagation();
    navigate("/logiformpage");
  };

  return (
    <section
      className="font-rubik relative bg-cover bg-center text-[#f6f4f9] md:p-2"
      style={{ backgroundImage: 'url("/images/pizzaimages/amalaa.jpg")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-ph opacity-75 pointer-events-none z-0"></div>

      {/* Login Button */}
      <div className="fixed top-3 right-3 z-[9999]">
        <button
          onClick={handleLoginClick}
          className="bg-ph hover:bg-ph/90 text-white rounded-[12px] flex items-center gap-2 px-4 py-2 shadow-lg transition-all duration-300 cursor-pointer"
        >
          <MdOutlinePersonAdd className="text-xl" />
          <span className="capitalize">login</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative p-3 lg:my-8 z-10 max-w-6xl">
        <h1 className="text-[28px] font-medium mb-3 leading-[1.2] md:text-[40px] lg:text-5xl max-w-3xl mt-10">
          Delicious Food Delivered to Your Doorstep
        </h1>

        <p className="leading-[1.5] mb-4 md:text-[20px] max-w-2xl">
          Fresh ingredients, amazing flavors, and fast delivery to your door
        </p>

        {/* Info section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          <p className="flex items-center gap-2 md:text-[18px]">
            <FaRegClock />
            <span>30–45 min delivery</span>
          </p>

          <p className="flex items-center gap-2 md:text-[18px]">
            <FaLocationDot />
            <span>Free delivery over ₦7000</span>
          </p>

          <p className="flex items-center gap-2 md:text-[18px]">
            <FaStar />
            <span>4.9 rating (500+ reviews)</span>
          </p>
        </div>

        {/* Call Button */}
        <button
          onClick={() => (window.location.href = "tel:+2347063026384")}
          className="bg-[#069494] md:text-[18px] rounded-[13px] flex items-center gap-2 px-6 py-2 hover:bg-[#047b68] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#069494] focus:ring-offset-2 focus:ring-offset-ph"
        >
          <IoCall className="text-white" />
          <span>Call to order: (+234) 706-302-6384</span>
        </button>

        {/* Opening Hours */}
        <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">
          ⏰ Open now • 9:00 AM - 10:00 PM
        </div>
      </div>
    </section>
  );
}
