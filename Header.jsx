import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

export function Header() {
  return (
    <section className="bg-ph h-vh">
      <div className=" p-2 leading-11">
        <h1 className="text-white text-[29px] font-bold mb-3 text-balance">
          Delicious Food Delivered
        </h1>
        <p className="text-white leading-[1.5] mb-2">
          Fresh ingredients, amazing flavors, and fast delivery to your door
        </p>
        <p className="text-white flex items-center gap-2">
          <FaRegClock className=" text-white" />
          30-45 min delivery
        </p>
        <p className="text-white flex items-center gap-2">
          <FaLocationDot className=" text-white" />
          Free delivery over $25
        </p>
        <p className="text-white flex items-center gap-2 mb-2">
          <FaStar className=" text-white" />
          4.9 rating
        </p>
        <button className="text-white bg-[#2ec2b3] rounded-[13px] flex items-center gap-2 px-12 py-0.5 hover:bg-[#2ecb] duration-300 ease-linear mb-6">
          <IoCall className=" text-white" />
          call to order: (555) 123-456
        </button>
      </div>
    </section>
  );
}
