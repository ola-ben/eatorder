import { useNavigate } from "react-router";
import { HiArrowSmallLeft } from "react-icons/hi2";

export default function Cartpage() {
  const navigate = useNavigate();
  return (
    <section className=" font-poppins mx-1.5  my-10">
      <HiArrowSmallLeft onClick={() => navigate("/")} />
      <p className=" capitalize  text-center text-xl font-bold">your order</p>
      <span className="flex justify-between">
        <p className=" capitalize">total:</p>
        <p className=" text-orange-600">$price</p>
      </span>
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/checkoutpage")}
          className="capitalize p-2 bg-pc w-[300px] my-10 text-white rounded-[13px]"
        >
          proceed to cart
        </button>
      </div>
    </section>
  );
}
