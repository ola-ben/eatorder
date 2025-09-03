import { useState } from "react";
import { Pizza } from "./Pizza";
import { FaSearch } from "react-icons/fa";

const dishesData = [
  {
    name: "Jollof Rice",
    ingredients:
      "Made with long-grain parboiled rice, tomatoes, tomato paste, onions, bell peppers, Scotch bonnet peppers, garlic, and ginger.",
    price: 1500.0,
    photoName: "/pizzaimages/jollofricee.jpg",
    type: "maindishes",
  },

  {
    name: "Amala & Beans Soup",
    ingredients:
      "Made from yam flour (elubo) mixed with hot water into a smooth, stretchy dough. Beans soup, often prepared as ewa alagbado or gbegiri, includes peeled cooked beans, palm oil,  seasoning cubes with meat",
    price: 1700.0,
    photoName: "/pizzaimages/amalaa.jpg",
    type: "maindishes",
  },
  {
    name: "Pounded Yam",
    ingredients:
      "Made by boiling yam pieces until soft and then pounding or blending them into a smooth, stretchy dough using only yam and water.",
    price: 900.0,
    photoName: "/pizzaimages/poundedyammm.jpg",
    type: "maindishes",
  },
  {
    name: "Eba & Efo",
    ingredients:
      "made from garri (cassava flakes) mixed with hot water, while Efo (vegetable soup) is prepared with spinach or fluted pumpkin leaves, palm oil, tomatoes, peppers, onions, crayfish, locust beans, and assorted meat or fish.",
    price: 1500.0,
    photoName: "/pizzaimages/ebaa.jpg",
    type: "maindishes",
  },
  {
    name: "Fried rice and Chicken",
    ingredients:
      "Fried rice with chicken  made with parboiled rice, mixed vegetables (carrots, peas, sweet corn, green beans), onions, garlic, soy sauce, curry powder, and seasoning, served with seasoned and fried or grilled chicken.",
    price: 2000.0,
    photoName: "/pizzaimages/friedricewithchicken.jpg",
    type: "maindishes",
  },
  {
    name: "Yam and Egg",
    ingredients:
      "Made with boiled yam slices served alongside a fried egg sauce prepared with eggs, tomatoes, onions, peppers, and seasoning.",
    price: 1700.0,
    photoName: "/pizzaimages/yamegg.jpg",
    type: "proteins",
  },
  {
    name: "Fish",
    ingredients:
      "Made with ingredients like fresh or smoked fish, onions, peppers, tomatoes, garlic, seasoning cubes, and palm or vegetable oil, depending on the cooking style.",
    price: 2500.0,
    photoName: "/pizzaimages/fish.jpg",
    type: "proteins",
  },
  {
    name: "Moi Moi",
    ingredients:
      "made from blended peeled beans, onions, peppers, oil (usually palm or vegetable), seasoning cubes, and optional additions like eggs, fish, or ground crayfish.",
    price: 500.0,
    photoName: "/pizzaimages/moimoii.jpg",
    type: "proteins",
  },
  {
    name: "Bush Meat",
    ingredients:
      "Prepared with ingredients like the meat itself (such as antelope or grasscutter), onions, peppers, garlic, ginger, seasoning cubes, and palm oil or vegetable oil, often cooked in a spicy sauce or soup.",
    price: 500.0,
    photoName: "/pizzaimages/bushmeat.jpg",
    type: "proteins",
  },
  {
    name: "Fanta",
    ingredients: "Carbonated drinks",
    price: 500.0,
    photoName: "/pizzaimages/fanta.jpeg",
    type: "extrasanddrinks",
  },
  {
    name: "Margerita Pizza",
    ingredients:
      "Fresh mozzarella, tomato sause, and basil on our hand-tossed dough",
    price: 4500.0,
    photoName: "/pizzaimages/Margheritapizza.jpg",
    type: "extrasanddrinks",
  },
  {
    name: "Shamawa",
    ingredients: "Carbonated drinks",
    price: 1000.0,
    photoName: "/pizzaimages/shawama.jpg",
    type: "extrasanddrinks",
  },
  {
    name: "Coke",
    ingredients: "Carbonated drinks",
    price: 1000.0,
    photoName: "/pizzaimages/coke.jpg",
    type: "extrasanddrinks",
  },
  {
    name: "Sprite",
    ingredients: "Carbonated drinks",
    price: 1000.0,
    photoName: "/pizzaimages/sprite.jpeg",
    type: "extrasanddrinks",
  },
];

export function Menu() {
  const [items, setItems] = useState("maindishes");
  return (
    <section className=" mt-5 p-2">
      <div className="lg:justify-center">
        <div className=" relative lg:flex lg:justify-center">
          <input
            type="text"
            placeholder="Select menu items..."
            className="border md:text-[20px] rounded-[10px] text-[14.5px] border-gray-300 focus:border-pc focus:outline-none relative w-[100%] p-2 pl-10 lg:w-100 lg:p-1 lg:text-[14px] lg:pl-10"
          />
          <FaSearch className="absolute top-1/2 transform -translate-y-1/2 ml-4 lg:left-112" />
        </div>

        <div className=" my-6 text-center space-x-2 bg-[#f6f4f9] text-[14.5px] p-1.5 rounded-[10px] md:space-x-12 lg:mx-[450px] lg:p-1 lg:space-x-6">
          <button
            onClick={() => setItems("maindishes")}
            className={`${
              items === "maindishes" && "bg-pc"
            } duration-300 md:text-[16.5px] lg:text-[14px] rounded-[10px]  py-1 px-2 text-[#4f2b00]`}
          >
            Main dishes
          </button>
          <button
            onClick={() => setItems("proteins")}
            className={`${
              items === "proteins" && "bg-pc"
            } duration-300 md:text-[16.5px] lg:text-[14px] rounded-[10px] py-1 px-2 text-[#4f2b00]`}
          >
            Proteins
          </button>

          <button
            onClick={() => setItems("extrasanddrinks")}
            className={`${
              items === "extrasanddrinks" && "bg-pc"
            } duration-300 md:text-[16.5px] lg:text-[14px]  rounded-[12px] py-1 px-2 text-[#4f2b00]`}
          >
            Extras/drinks
          </button>
        </div>
      </div>
      <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-3">
        {items === "maindishes" &&
          dishesData.map((pizza) => (
            <Pizza
              key={pizza.name}
              name={pizza.name}
              ingredients={pizza.ingredients}
              price={pizza.price}
              photoName={pizza.photoName}
            />
          ))}
        {items === "proteins" &&
          dishesData
            .filter((mainPizza) => mainPizza.type === "proteins")
            .map((pizza) => (
              <Pizza
                key={pizza.name}
                name={pizza.name}
                ingredients={pizza.ingredients}
                price={pizza.price}
                photoName={pizza.photoName}
              />
            ))}
        {items === "extrasanddrinks" &&
          dishesData
            .filter((mainPizza) => mainPizza.type === "extrasanddrinks")
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
