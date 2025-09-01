import { HiArrowSmallLeft } from "react-icons/hi2";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Checkoutpage() {
  const [delivery, setDelivery] = useState("pickup");
  const navigate = useNavigate();
  return (
    <section className=" font-montserrat mx-1.5 my-1.5">
      <div className=" flex items-center space-x-2.5 mb-7">
        <HiArrowSmallLeft onClick={() => navigate("/cartpage")} />
        <p className="text-2xl ">ckeckout</p>
      </div>
      <form className="">
        <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5">
          <p className="capitalize mb-4">fullfillment option</p>

          <div className="">
            <button
              onClick={() => setDelivery("pickup")}
              className={`${
                delivery === "pickup" && "text-ph"
              } flex items-center gap-4`}
            >
              <CiCircleCheck />
              <p>Pickup</p>
            </button>

            <button
              onClick={() => setDelivery("delivery")}
              className={`${
                delivery === "delivery" && "text-ph"
              } flex items-center gap-4`}
            >
              <CiCircleCheck />
              <p>Delivery</p>
            </button>
          </div>
        </div>
        <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5 my-10">
          <p className="capitalize mb-4">fullfillment option</p>
          <div className="grid grid-cols-1  font-medium text-gray-700 text-[15px] md:text-xl lg:text-[17px]">
            <label htmlFor="">Full Name *</label>
            <input
              type="text"
              required
              className="w-full bg-[#fdfbfb] border rounded-[10px] p-1.5 border-gray-400 focus:border-ph focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 my-2.5 font-medium text-gray-700 text-[15px]  md:text-xl lg:text-[17px]">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              required
              className="w-full bg-[#fdfbfb] border rounded-[10px] p-1.5 border-gray-400 focus:border-ph focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1  font-medium text-gray-700 text-[15px]  md:text-xl lg:text-[17px]">
            <label htmlFor="">Email</label>
            <input
              type="text"
              required
              className="w-full bg-white border rounded-[10px] p-1.5 border-gray-400 focus:border-ph focus:outline-none mb-4"
            />
          </div>
        </div>
        <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5 my-10">
          <p className="capitalize mb-4">Special instructions</p>
          <div className="grid grid-cols-1  font-medium text-gray-700 text-[15px]  md:text-xl lg:text-[17px]">
            <label htmlFor="">note (optional)</label>
            <input
              type="text"
              placeholder="any special requests or instuctions..."
              required
              className="w-full bg-[#fdfbfb] border rounded-[10px] p-1.5 border-gray-400 focus:border-ph focus:outline-none "
            />
          </div>
        </div>
        {delivery === "delivery" && (
          <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5 my-10">
            <p className="capitalize mb-4">Delivery address</p>
            <div className="grid grid-cols-1  font-medium text-gray-700 text-[15px]  md:text-xl lg:text-[17px]">
              <label htmlFor="">Address *</label>
              <input
                type="text"
                placeholder="enter your complete delivery address"
                required
                className="w-full bg-[#fdfbfb] border rounded-[10px] p-1.5 border-gray-400 focus:border-ph focus:outline-none "
              />
            </div>
          </div>
        )}
      </form>

      <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5 my-10">
        <span className="flex justify-between">
          <p className=" capitalize"> order total:</p>
          <p className=" text-orange-600">$price</p>
        </span>
        <div className="flex justify-center">
          <button className="capitalize p-2 bg-pc w-[300px] my-10 text-white rounded-[13px]">
            place order
          </button>
        </div>
      </div>
    </section>
  );
}
