import { IoIosAdd } from "react-icons/io";

export function Pizza({ name, ingredients, price, photoName }) {
  return (
    <div className=" list-none shadow-sm rounded-b-[10px] mx-0.5 ">
      <img
        src={photoName}
        alt={name}
        className=" w-full h-64 rounded-t-[15px] 
          "
      />
      <div className=" p-2">
        <p className=" text-2xl my-1.5 font-rubik text-[#4f2b00]">{name}</p>
        <p className="leading-[1.5] mb-4 text-[14.5px] font-rubik text-[#523410]">
          {ingredients}
        </p>

        <span className="flex items-center justify-between mb-2">
          <p className="text-ph text-xl  font-rubik">#{price}.00</p>
          <button className="bg-ph p-2.5 rounded-xl hover:bg-orange-700 duration-300">
            <IoIosAdd className=" text-white text-xl " />
          </button>
        </span>
      </div>
    </div>
  );
}
