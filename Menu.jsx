import { useState } from "react";
import { Pizza } from "./pizza";
import { FaSearch } from "react-icons/fa";

const pizzaData = [
  {
    name: "Classic Burger",
    ingredients:
      "Juicy beef with fresh lettuce, tomato, cheese, and special sause",
    price: 12.99,
    photoName: "/pizzaimages/Classicburger.jpg",
    type: "main",
  },

  {
    name: "Ceaser Salad",
    ingredients:
      "Crisp romaine lettuce with grilled chicken, crouton, and parmesan cheese",
    price: 9.99,
    photoName: "/pizzaimages/Classicburger.jpg",
    type: "salad",
  },
  {
    name: "Margerita Pizza",
    ingredients:
      "Fresh mozzarella, tomato sause, and basil on our hand-tossed dough",
    price: 14.99,
    photoName: "/pizzaimages/Margheritapizza.jpg",
    type: "main",
  },
  {
    name: "Backon Cheeseburger",
    ingredients:
      "Double beef patty with cripsy bcon, cheedar cheese, and barbecue sause",
    price: 15.99,
    photoName: "/pizzaimages/Baconcheeseburger.jpg",
    type: "main",
  },
  {
    name: "Mediterranean Salad",
    ingredients:
      "Mixed greens with olives, feta cheese, cucumbers, and balsamic dressing",
    price: 11.99,
    photoName: "/pizzaimages/Mediterranean Salad.jpg",
    type: "salad",
  },
  {
    name: "Pepproni Pizza",
    ingredients: "Classic pepperoni with mozzarella cheeese and tomato sause",
    price: 16.99,
    photoName: "/pizzaimages/Pepperonipizza.jpg",
    type: "main",
  },
];

export function Menu() {
  const [items, setItems] = useState("all");
  return (
    <section className=" mt-5 p-2">
      <div className="">
        <div className=" relative">
          <input
            type="text"
            placeholder="Select menu items..."
            className="border rounded-[13px] border-gray-300 focus:border-pc focus:outline-none relative w-[100%] p-2 pl-10"
          />
          <FaSearch className="absolute top-1/2 transform -translate-y-1/2 ml-4" />
        </div>

        <div className=" my-6 text-center space-x-15 bg-[#f6f4f9] p-1.5 rounded-[12px]">
          <button
            onClick={() => setItems("all")}
            className={`${
              items === "all" && "bg-pc"
            } active:bg-[#ffffff]  rounded-[12px] py-1 px-2`}
          >
            All items
          </button>
          <button
            onClick={() => setItems("main")}
            className={`${
              items === "main" && "bg-pc"
            } active:bg-[#ffffff]  rounded-[12px] py-1 px-2`}
          >
            Mains
          </button>

          <button
            onClick={() => setItems("salad")}
            className={`${
              items === "salad" && "bg-pc"
            } active:bg-[#ffffff]  rounded-[12px] py-1 px-2`}
          >
            Salad
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items === "all" &&
          pizzaData.map((pizza) => (
            <Pizza
              key={pizza.name}
              name={pizza.name}
              ingredients={pizza.ingredients}
              price={pizza.price}
              photoName={pizza.photoName}
            />
          ))}
        {items === "main" &&
          pizzaData
            .filter((mainPizza) => mainPizza.type === "main")
            .map((pizza) => (
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
