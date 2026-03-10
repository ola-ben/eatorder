import { HiArrowSmallLeft } from "react-icons/hi2";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext"; // your cart context

export default function Checkoutpage() {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart(); // cart items and total price

  const [delivery, setDelivery] = useState("pickup");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const handlePlaceOrder = () => {
    // Simple validation
    if (
      !fullName ||
      !phone ||
      !email ||
      (delivery === "delivery" && !address)
    ) {
      alert("Please fill all required fields");
      return;
    }

    const order = {
      fullName,
      phone,
      email,
      delivery,
      address,
      note,
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        photoName: item.photoName,
      })),
      totalPrice,
    };

    // Navigate to success page with order data
    navigate("/successpage", { state: { order } });
  };

  return (
    <section className="font-montserrat mx-1.5 my-5 lg:my-10 md:mx-13 lg:mx-80">
      {/* Back button */}
      <div className="flex items-center space-x-2.5 mb-7">
        <HiArrowSmallLeft
          onClick={() => navigate("/cartpage")}
          className="text-3xl cursor-pointer"
        />
        <p className="text-2xl font-semibold">Checkout</p>
      </div>

      <form>
        {/* Fulfillment option */}
        <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5">
          <p className="capitalize mb-4 font-semibold">Fulfillment option</p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setDelivery("pickup")}
              className={`flex items-center gap-4 ${
                delivery === "pickup" ? "text-ph font-semibold" : ""
              }`}
            >
              <CiCircleCheck />
              <p>Pickup</p>
            </button>

            <button
              type="button"
              onClick={() => setDelivery("delivery")}
              className={`flex items-center gap-4 ${
                delivery === "delivery" ? "text-ph font-semibold" : ""
              }`}
            >
              <CiCircleCheck />
              <p>Delivery</p>
            </button>
          </div>
        </div>

        {/* Customer info */}
        <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5 my-10">
          <p className="capitalize mb-4 font-semibold">Customer Info</p>

          <div className="grid grid-cols-1 font-medium text-gray-700 text-[15px] md:text-[14px] lg:text-[14px]">
            <label>Full Name *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-[#fdfbfb] border rounded-[10px] p-1.5 border-gray-200 focus:border-ph focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 my-2.5 font-medium text-gray-700 text-[15px] md:text-[14px] lg:text-[14px]">
            <label>Phone Number *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-[#fdfbfb] border rounded-[10px] p-1.5 border-gray-200 focus:border-ph focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 font-medium text-gray-700 text-[15px] md:text-[14px] lg:text-[14px]">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white border rounded-[10px] p-1.5 border-gray-200 focus:border-ph focus:outline-none mb-4"
            />
          </div>
        </div>

        {/* Special instructions */}
        <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5 my-10">
          <p className="capitalize mb-4 font-semibold">Special instructions</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any special requests..."
            className="w-full bg-[#fdfbfb] border rounded-[10px] p-1.5 border-gray-200 focus:border-ph focus:outline-none"
          ></textarea>
        </div>

        {/* Delivery address if delivery selected */}
        {delivery === "delivery" && (
          <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5 my-10">
            <p className="capitalize mb-4 font-semibold">Delivery address</p>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              className="w-full bg-[#fdfbfb] border rounded-[10px] p-1.5 border-gray-200 focus:border-ph focus:outline-none"
              required
            ></textarea>
          </div>
        )}

        {/* Order total & place order */}
        <div className="bg-[#f6f4f9] p-5 rounded-[12px] mx-1.5 my-10">
          <span className="flex justify-between font-bold text-lg">
            <p className="capitalize">Order total:</p>
            <p className="text-orange-600">₦{totalPrice}</p>
          </span>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="capitalize p-2 bg-pc w-[300px] my-10 text-white rounded-[13px]"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
