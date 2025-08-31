export default function Cartpage() {
  return (
    <section className=" font-poppins mx-1.5  my-30">
      <p className=" capitalize  text-center text-xl font-bold">your order</p>
      <span className="flex justify-between">
        <p className=" capitalize">total:</p>
        <p className=" text-orange-600">$price</p>
      </span>
      <button className=" my-2 capitalize p-2 bg-pc w-[350px]  text-white rounded-[13px]">
        proceed to checkout
      </button>
    </section>
  );
}
