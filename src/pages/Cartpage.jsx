import { useNavigate } from "react-router-dom";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useCart } from "../context/CartContext";

export default function Cartpage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <section className="font-poppins mx-1.5 my-5 md:my-10 lg:mx-80">
      {/* Back button */}
      <HiArrowSmallLeft
        onClick={() => navigate("/")}
        className="text-3xl cursor-pointer mb-4"
      />

      <h2 className="capitalize text-center text-xl font-bold mb-6">
        Your Order
      </h2>

      {/* Cart items */}
      {cart.length === 0 ? (
        <p className="text-center mt-5 text-gray-500">Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.name}
            className="flex flex-col md:flex-row md:items-center justify-between my-3 p-3 border border-gray-300 rounded-md gap-3"
          >
            {/* Item info */}
            <div className="flex items-center gap-3 w-full md:w-2/3">
              <img
                src={item.photoName}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₦{item.price} x {item.quantity}
                </p>
              </div>
            </div>

            {/* Quantity buttons */}
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <button
                onClick={() => removeFromCart(item.name)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                -
              </button>

              <span className="font-semibold w-6 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => addToCart(item)}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                +
              </button>
            </div>

            {/* Item total price */}
            <p className="font-semibold mt-2 md:mt-0">
              ₦{item.price * item.quantity}
            </p>
          </div>
        ))
      )}

      {/* Total price */}
      {cart.length > 0 && (
        <div className="flex justify-between mt-6 font-bold text-lg">
          <p>Total:</p>
          <p className="text-orange-600">₦{totalPrice}</p>
        </div>
      )}

      {/* Proceed button */}
      {cart.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() =>
              navigate("/checkoutpage", { state: { cart, totalPrice } })
            }
            className="capitalize p-2 bg-pc w-[300px] my-10 text-white rounded-[13px]"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </section>
  );
}
