import { IoIosAdd } from "react-icons/io";
import { HiMinusSmall } from "react-icons/hi2";
import { useState } from "react";

export function Pizza({ name, ingredients, price, photoName }) {
  const [qauntity, setQuantity] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [modalMessage2, setModalMessage2] = useState("");

  const [showModal, setShowModal] = useState(false);

  const showCustomModal = (message) => {
    setModalMessage(message);
    setModalMessage2(message);
    setShowModal(true);

    setTimeout(() => setShowModal(false), 2500);
  };

  function addQuantity() {
    setQuantity(qauntity === 10 ? qauntity : qauntity + 1);
    showCustomModal("Added to cart");
    setModalMessage2(`${name} has been added to your cart`);
  }
  function removeQuantity() {
    setQuantity(qauntity === 0 ? qauntity : qauntity - 1);
    showCustomModal("removed from cart");
    setModalMessage2(`${name} has been removed  from your cart `);
  }

  return (
    <div className="shadow-sm rounded-b-[10px] mx-0.5 overflow-hidden lg:mx-2">
      <img
        src={photoName}
        alt={name}
        className=" w-full h-64 rounded-t-[15px] duration-300  object-cover transition-transform hover:scale-110
          "
      />
      <div className=" p-2">
        <p className=" text-xl my-1.5 font-rubik text-[#1a0e00] md:text-2xl">
          {name}
        </p>
        <p className="leading-[1.5] mb-4 text-[15px] font-dmsans text-[#564d42] md:text-[16px] lg:text-[14px]">
          {ingredients}
        </p>
        <span className="flex items-center justify-between mb-2">
          <p className="text-ph text-xl  font-rubik md:text-2xl">#{price}.00</p>
          <div>
            {qauntity > 0 && (
              <>
                <button
                  onClick={removeQuantity}
                  className="bg-red-500  p-2.5 text-white text-xl  md:text-2xl rounded-xl duration-300"
                >
                  <HiMinusSmall />
                </button>
                <span className="mx-6">{qauntity}</span>
              </>
            )}

            <button
              onClick={addQuantity}
              className={`${
                qauntity >= 1
                  ? "bg-green-500 p-2.5 rounded-xl text-xl  md:text-2xl text-white duration-300 "
                  : "bg-ph p-2.5 rounded-xl text-xl  md:text-2xl text-white duration-300"
              }`}
            >
              <IoIosAdd />
            </button>
            {showModal && (
              <div
                className="fixed top-0 left-0 bg-white border border-gray-300 z-50
               px-4 py-4 rounded shadow-lg w-full leading-7 duration-300"
              >
                <p className="text-[#523410] text-start   font-rubik text-[14.5px] capitalize">
                  {modalMessage}
                </p>
                <p className="text-[#523410] leading-[1.5] text-start text-[14.5px] capitalize  font-rubik">
                  {modalMessage2}
                </p>
              </div>
            )}
          </div>
        </span>
      </div>
    </div>
  );
}
