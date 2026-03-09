import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

export function Header() {
  return (
    <section
      className="font-rubik relative bg-cover bg-center text-[#f6f4f9] md:p-2"
      style={{ backgroundImage: 'url("/images/pizzaimages/amalaa.jpg")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-ph opacity-75"></div>

      {/* Content */}
      <div className="relative p-2 lg:my-6.5 z-10">
        <h1 className="text-[29px] font-medium mb-3 leading-[1.2] md:text-[40px] mt-8 lg:text-5xl max-w-3xl">
          Delicious Food Delivered to Your Doorstep
        </h1>

        <p className="leading-[1.5] mb-4 md:text-[20px] max-w-2xl">
          Fresh ingredients, amazing flavors, and fast delivery to your door
        </p>

        {/* Info section - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <p className="flex items-center gap-2 md:text-[18px] lg:text-[16px]">
            <FaRegClock className="flex-shrink-0" />
            <span>30-45 min delivery</span>
          </p>

          <p className="flex items-center gap-2 md:text-[18px] lg:text-[16px]">
            <FaLocationDot className="flex-shrink-0 text-white" />
            <span>Free delivery over #7000</span>
          </p>

          <p className="flex items-center gap-2 md:text-[18px] lg:text-[16px]">
            <FaStar className="flex-shrink-0" />
            <span>4.9 rating (500+ reviews)</span>
          </p>
        </div>

        {/* Call to action button */}
        <button className="bg-[#069494] md:text-[18px] lg:mt-2 rounded-[13px] flex items-center gap-2 px-8 py-2 hover:bg-[#047b68] transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-[#069494] focus:ring-offset-2 focus:ring-offset-ph">
          <IoCall className="text-white" />
          <span>Call to order: (+234) 706-302-6384</span>
        </button>

        {/* Optional: Opening hours badge */}
        <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">
          ⏰ Open now • 9:00 AM - 10:00 PM
        </div>
      </div>
    </section>
  );
}
