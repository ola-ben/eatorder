import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

export function Header() {
  return (
    <section
      className="font-rubik relative bg-cover bg-center text-[#f6f4f9]  md:p-2"
      style={{ backgroundImage: 'url("./pizzaimages/amalaa.jpg")' }}
    >
      <div className=" absolute inset-0 bg-ph opacity-75 "></div>
      <div className=" p-2 leading-11 relative  lg:my-6.5">
        <h1 className=" text-[29px] font-medium mb-3 text-balance leading-[1.2] md:text-[40px] mt-8 lg:text-5xl">
          Delicious Food Delivered
        </h1>
        <p className=" leading-[1.5] mb-2 md:text-[20px]">
          Fresh ingredients, amazing flavors, and fast delivery to your door
        </p>
        <div className="lg:flex lg:gap-5">
          <p className=" flex items-center gap-2 md:text-[20px] lg:text-[17px]">
            <FaRegClock className=" " />
            30-45 min delivery
          </p>
          <p className=" flex items-center gap-2 md:text-[20px] lg:text-[17px]">
            <FaLocationDot className=" text-white" />
            Free delivery over #7000.00
          </p>
          <p className=" flex items-center gap-2 md:text-[20px] lg:text-[17px]">
            <FaStar className=" " />
            4.9 rating
          </p>
        </div>

        <button className=" bg-[#069494] md:text-[20px] lg:mt-4 rounded-[13px] flex items-center gap-2 px-12 py-0.5 hover:bg-[#047b68bb] duration-300 ease-linear mb-6">
          <IoCall className=" text-white" />
          call to order: (555) 123-456
        </button>
      </div>
    </section>
  );
}
