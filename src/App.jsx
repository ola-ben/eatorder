const pizzaData = [
  {
    name: "Classic Burger",
    ingredients:
      "Juicy beef with fresh lettuce, tomato, cheese, and special sause",
    price: 12.99,
    photoName: "pizzas/Classicburger.jpg",
  },

  {
    name: "Ceaser Sald",
    ingredients:
      "Crisp romaine lettuce with grilled chicken, crouton, and parmesan cheese",
    price: 9.99,
    photoName: "pizzas/Ceasersalad.jpg",
  },
  {
    name: "Margerita Pizza",
    ingredients:
      "Fresh mozzarella, tomato sause, and basil on our hand-tossed dough",
    price: 14.99,
    photoName: "pizzas/Margheritapizza.jpg",
  },
  {
    name: "Backon Cheeseburger",
    ingredients:
      "Double beef patty with cripsy bcon, cheedar cheese, and barbecue sause",
    price: 15.99,
    photoName: "pizzas/Baconcheeseburger.jpg",
  },
  {
    name: "Mediterranean Salad",
    ingredients:
      "Mixed greens with olives, feta cheese, cucumbers, and balsamic dressing",
    price: 11.99,
    photoName: "pizzas/Margheritapizza.jpg",
  },
  {
    name: "Pepproni Pizza",
    ingredients: "Classic pepperoni with mozzarella cheeese and tomato sause",
    price: 16.99,
    photoName: "pizzas/Pepperonipizza.jpg",
  },
];

import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

export default function App() {
  return (
    <section className="">
      <Header />
      <Menu />
      {/* <Pizza /> */}
      <Footer />
    </section>
  );
}

export function Header() {
  return (
    <section className="bg-ph h-vh">
      <div className=" p-2 leading-11">
        <h1 className="text-white text-[29px] font-bold mb-3 text-balance">
          Delicious Food Delivered
        </h1>
        <p className="text-white leading-[1.5] mb-2">
          Fresh ingredients, amazing flavors, and fast delivery to your door
        </p>
        <p className="text-white flex items-center gap-2">
          <FaRegClock className=" text-white" />
          30-45 min delivery
        </p>
        <p className="text-white flex items-center gap-2">
          <FaLocationDot className=" text-white" />
          Free delivery over $25
        </p>
        <p className="text-white flex items-center gap-2 mb-2">
          <FaStar className=" text-white" />
          4.9 rating
        </p>
        <button className="text-white bg-[#2ec2b3] rounded-[13px] flex items-center gap-2 px-14 py-0.5 hover:bg-sky-700 duration-300 ease-linear mb-6">
          <IoCall className=" text-white" />
          call to order: (555) 123-456
        </button>
      </div>
    </section>
  );
}
export function Menu() {
  return (
    <section className=" mt-5 p-2">
      <div className="">
        <input
          type="text"
          placeholder="         Select menu items..."
          className="border rounded-[13px] border-gray-300 focus:border-pc focus:outline-none relative w-[100%] p-2"
        />
        <FaSearch className="fixed top-3/3 transform -translate-y-55/3 ml-4" />
        <div className=" my-3.5 text-center space-x-15 bg-[#f6f4f3] p-1.5 rounded-[12px]">
          <button className=" bg-[#ffffff] ">All items</button>
          <button>Mains</button>
          <button>Salad</button>
        </div>
      </div>
      <div className="flex">
        {pizzaData.map((pizza) => (
          <Pizza
            key={pizza.name}
            name={pizza.name}
            ingredients={pizza.ingredients}
            price={pizza.price}
            photoName={pizza.photoName}
          />
        ))}
      </div>
    </section>
  );
}

export function Pizza({ name}) {
  return (
    <div className=" list-none">
      <img
        src="/pizzaimages/Classicburger.jpg"
        alt=""
        className=" w-full h-62 rounded-t-[15px]
          "
      />
      <div className=" p-2">
        <p className=" text-2xl my-4">{name}</p>
        <p className="leading-[1.5] mb-4">
          Juicy beef with fresh lettuce, tomato, cheese, and special sause
        </p>

        <span className="flex items-center justify-between">
          <p className="text-ph text-xl">$12.99</p>
          <button className="bg-ph p-3 rounded-xl ">
            <IoIosAdd className=" text-white text-xl" />
          </button>
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  return <section className=""></section>;
}
