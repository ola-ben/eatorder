import { IoIosAdd } from "react-icons/io";

export function Pizza({ name, ingredients, price, photoName }) {
  return (
    <div className=" list-none shadow-sm rounded-b-[10px]">
      <img
        src={photoName}
        alt={name}
        className=" w-full h-62 rounded-t-[15px] 
          "
      />
      <div className=" p-2">
        <p className=" text-2xl my-4">{name}</p>
        <p className="leading-[1.5] mb-4">{ingredients}</p>

        <span className="flex items-center justify-between mb-5">
          <p className="text-ph text-xl">${price}</p>
          <button className="bg-ph p-3 rounded-xl hover:bg-orange-700 duration-300">
            <IoIosAdd className=" text-white text-xl " />
          </button>
        </span>
      </div>
    </div>
  );
}
