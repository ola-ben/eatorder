import { HiCheckCircle } from "react-icons/hi2";
import { HiShoppingBag } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Successpage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Order details passed via state from checkout page
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-gray-500 mb-4">No order found</p>
        <button
          onClick={() => navigate("/")}
          className="bg-ph text-white px-6 py-3 rounded-lg hover:bg-orange-700 duration-300"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <section className="font-montserrat mx-1.5 my-10 lg:mx-80 text-center">
      {/* Animated Success icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      >
        <HiCheckCircle className="text-green-500 text-7xl mx-auto mb-6" />
      </motion.div>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-3xl font-bold mb-2"
      >
        Order Placed Successfully!
      </motion.h1>

      <motion.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-gray-600 mb-6"
      >
        Thank you, {order.fullName}. Your order has been received.
      </motion.p>

      {/* Order Number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-200"
      >
        <p className="text-sm text-blue-800">Order Number</p>
        <p className="text-2xl font-bold text-blue-600">{order.id}</p>
      </motion.div>

      {/* Animated Order summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-[#f6f4f9] p-5 rounded-[12px] mb-6 text-left"
      >
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <p className="mb-2">
          <span className="font-semibold">Fulfillment:</span>{" "}
          {order.delivery === "delivery" ? "Delivery" : "Pickup"}
        </p>

        {order.delivery === "delivery" && (
          <p className="mb-2">
            <span className="font-semibold">Delivery Address:</span>{" "}
            {order.address}
          </p>
        )}

        <p className="mb-2">
          <span className="font-semibold">Phone:</span> {order.phone}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {order.email}
        </p>

        {order.note && (
          <p className="mb-2">
            <span className="font-semibold">Note:</span> {order.note}
          </p>
        )}

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Items:</h3>
          {order.items.map((item) => (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center mb-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.photoName}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <p>
                  {item.name} x {item.quantity}
                </p>
              </div>
              <p className="font-semibold">₦{item.price * item.quantity}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between mt-4 font-bold text-lg">
          <p>Total:</p>
          <p className="text-orange-600">₦{order.totalPrice}</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex flex-col gap-3"
      >
        <button
          onClick={() => navigate("/orders")}
          className="capitalize p-3 bg-ph text-white rounded-[13px] hover:bg-orange-700 duration-300 flex items-center justify-center gap-2"
        >
          <HiShoppingBag className="text-xl" />
          View My Orders
        </button>

        <button
          onClick={() => navigate("/")}
          className="capitalize p-3 border border-ph text-ph rounded-[13px] hover:bg-orange-50 duration-300"
        >
          Back to Home
        </button>
      </motion.div>
    </section>
  );
}
