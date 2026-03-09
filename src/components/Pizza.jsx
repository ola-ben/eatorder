import { IoIosAdd } from "react-icons/io";
import { HiMinusSmall } from "react-icons/hi2";
import { useState } from "react";

export function Pizza({ name, ingredients, price, photoName }) {
  const [quantity, setQuantity] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [modalMessage2, setModalMessage2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Fallback image with dish name
  const fallbackImage = `https://placehold.co/600x400/4f2b00/white?text=${encodeURIComponent(name)}`;

  const showCustomModal = (message, itemMessage) => {
    setModalMessage(message);
    setModalMessage2(itemMessage);
    setShowModal(true);

    setTimeout(() => setShowModal(false), 2500);
  };

  function addQuantity() {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      showCustomModal("Added to cart", `${name} has been added to your cart`);
    } else {
      showCustomModal(
        "Maximum limit reached",
        "You cannot add more than 10 items",
      );
    }
  }

  function removeQuantity() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      showCustomModal(
        "Removed from cart",
        `${name} has been removed from your cart`,
      );
    }
  }

  return (
    <div className="shadow-sm rounded-b-[10px] mx-0.5 overflow-hidden lg:mx-2 relative">
      {/* Image with fallback */}
      <div className="w-full h-64 overflow-hidden rounded-t-[15px] bg-gray-100">
        <img
          src={imgError ? fallbackImage : photoName}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-2">
        <p className="text-xl my-1.5 font-rubik text-[#1a0e00] md:text-2xl">
          {name}
        </p>
        <p className="leading-[1.5] mb-4 text-[14px] font-dmsans text-[#564d42] md:text-[16px] lg:text-[14px]">
          {ingredients}
        </p>

        <span className="flex items-center justify-between mb-2">
          <p className="text-ph text-xl font-rubik md:text-2xl">#{price}.00</p>

          <div className="flex items-center">
            {quantity > 0 && (
              <>
                <button
                  onClick={removeQuantity}
                  className="bg-red-500 p-2.5 text-white text-xl md:text-2xl rounded-xl duration-300 hover:bg-red-600"
                >
                  <HiMinusSmall />
                </button>
                <span className="mx-6 font-semibold">{quantity}</span>
              </>
            )}

            <button
              onClick={addQuantity}
              className={`${
                quantity >= 1
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-ph hover:bg-opacity-80"
              } p-2.5 rounded-xl text-xl md:text-2xl text-white duration-300`}
            >
              <IoIosAdd />
            </button>
          </div>
        </span>
      </div>

      {/* Modal notification */}
      {showModal && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 z-50 px-6 py-4 rounded-lg shadow-lg w-11/12 max-w-md animate-slideDown">
          <p className="text-[#523410] text-center font-rubik text-[14.5px] capitalize font-semibold">
            {modalMessage}
          </p>
          <p className="text-[#523410] text-center text-[14.5px] capitalize font-rubik mt-1">
            {modalMessage2}
          </p>
        </div>
      )}
    </div>
  );
}
