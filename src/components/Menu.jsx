import { useState } from "react";
import { Pizza } from "./Pizza";
import { FaSearch } from "react-icons/fa";

const dishesData = [
  {
    name: "Jollof Rice",
    ingredients:
      "Made with long-grain parboiled rice, tomatoes, tomato paste, onions, bell peppers, Scotch bonnet peppers, garlic, and ginger.",
    price: 1500.0,
    photoName: "/images/pizzaimages/jollofricee.jpg",
    type: "maindishes",
  },
  {
    name: "Amala & Beans Soup",
    ingredients:
      "Made from yam flour (elubo) mixed with hot water into a smooth, stretchy dough. Beans soup, often prepared as ewa alagbado or gbegiri, includes peeled cooked beans, palm oil, seasoning cubes with meat",
    price: 1700.0,
    photoName: "/images/pizzaimages/amalaa.jpg",
    type: "maindishes",
  },
  {
    name: "Pounded Yam",
    ingredients:
      "Made by boiling yam pieces until soft and then pounding or blending them into a smooth, stretchy dough using only yam and water.",
    price: 900.0,
    photoName: "/images/pizzaimages/poundedyammm.jpg",
    type: "maindishes",
  },
  {
    name: "Eba & Efo",
    ingredients:
      "made from garri (cassava flakes) mixed with hot water, while Efo (vegetable soup) is prepared with spinach or fluted pumpkin leaves, palm oil, tomatoes, peppers, onions, crayfish, locust beans, and assorted meat or fish.",
    price: 1500.0,
    photoName: "/images/pizzaimages/ebaa.jpg",
    type: "maindishes",
  },
  {
    name: "Fried rice and Chicken",
    ingredients:
      "Fried rice with chicken made with parboiled rice, mixed vegetables (carrots, peas, sweet corn, green beans), onions, garlic, soy sauce, curry powder, and seasoning, served with seasoned and fried or grilled chicken.",
    price: 2000.0,
    photoName: "/images/pizzaimages/friedricewithchicken.jpg",
    type: "maindishes",
  },
  {
    name: "Yam and Egg",
    ingredients:
      "Made with boiled yam slices served alongside a fried egg sauce prepared with eggs, tomatoes, onions, peppers, and seasoning.",
    price: 1700.0,
    photoName: "/images/pizzaimages/yamegg.jpg",
    type: "proteins",
  },
  {
    name: "Fish",
    ingredients:
      "Made with ingredients like fresh or smoked fish, onions, peppers, tomatoes, garlic, seasoning cubes, and palm or vegetable oil, depending on the cooking style.",
    price: 2500.0,
    photoName: "/images/pizzaimages/fish.jpg",
    type: "proteins",
  },
  {
    name: "Moi Moi",
    ingredients:
      "made from blended peeled beans, onions, peppers, oil (usually palm or vegetable), seasoning cubes, and optional additions like eggs, fish, or ground crayfish.",
    price: 500.0,
    photoName: "/images/pizzaimages/moimoii.jpg",
    type: "proteins",
  },
  {
    name: "Bush Meat",
    ingredients:
      "Prepared with ingredients like the meat itself (such as antelope or grasscutter), onions, peppers, garlic, ginger, seasoning cubes, and palm oil or vegetable oil, often cooked in a spicy sauce or soup.",
    price: 500.0,
    photoName: "/images/pizzaimages/bushmeat.jpg",
    type: "proteins",
  },
  {
    name: "Fanta",
    ingredients: "Carbonated drinks",
    price: 500.0,
    photoName: "/images/pizzaimages/fanta.jpeg",
    type: "extrasanddrinks",
  },
  {
    name: "Margerita Pizza",
    ingredients:
      "Fresh mozzarella, tomato sause, and basil on our hand-tossed dough",
    price: 4500.0,
    photoName: "/images/pizzaimages/Margheritapizza.jpg",
    type: "extrasanddrinks",
  },
  {
    name: "Shawarma",
    ingredients: "Carbonated drinks",
    price: 1000.0,
    photoName: "/images/pizzaimages/shawama.jpg",
    type: "extrasanddrinks",
  },
  {
    name: "Coke",
    ingredients: "Carbonated drinks",
    price: 1000.0,
    photoName: "/images/pizzaimages/coke.jpg",
    type: "extrasanddrinks",
  },
  {
    name: "Sprite",
    ingredients: "Carbonated drinks",
    price: 1000.0,
    photoName: "/images/pizzaimages/sprite.jpeg",
    type: "extrasanddrinks",
  },
];

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("maindishes");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter dishes based on selected category and search query
  const getFilteredDishes = () => {
    // First filter by category
    const categoryFiltered = dishesData.filter(
      (dish) => dish.type === selectedCategory,
    );

    // If there's a search query, filter further by name or ingredients
    if (searchQuery.trim() === "") {
      return categoryFiltered;
    }

    const query = searchQuery.toLowerCase().trim();
    return categoryFiltered.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query) ||
        dish.ingredients.toLowerCase().includes(query),
    );
  };

  const filteredDishes = getFilteredDishes();

  return (
    <section className="mt-5 p-2 md:mx-1.5">
      <div className="lg:justify-center">
        {/* Search box with icon inside */}
        <div className="relative flex justify-center">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-base" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-[10px] text-sm md:text-base border-gray-300 focus:border-pc focus:outline-none w-full max-w-[400px] p-2 pl-10 md:p-2.5 lg:p-2"
          />
        </div>

        {/* Category buttons */}
        <div className="my-6 text-center space-x-2 bg-[#f6f4f9] text-sm md:text-base p-1.5 rounded-[10px] md:space-x-4 lg:space-x-6 max-w-fit mx-auto">
          <button
            onClick={() => {
              setSelectedCategory("maindishes");
              setSearchQuery("");
            }}
            className={`${
              selectedCategory === "maindishes" ? "bg-pc" : ""
            } duration-300 rounded-[10px] py-1.5 px-3 md:px-4 text-[#4f2b00] text-sm md:text-base whitespace-nowrap`}
          >
            Main dishes
          </button>
          <button
            onClick={() => {
              setSelectedCategory("proteins");
              setSearchQuery("");
            }}
            className={`${
              selectedCategory === "proteins" ? "bg-pc" : ""
            } duration-300 rounded-[10px] py-1.5 px-3 md:px-4 text-[#4f2b00] text-sm md:text-base whitespace-nowrap`}
          >
            Proteins
          </button>
          <button
            onClick={() => {
              setSelectedCategory("extrasanddrinks");
              setSearchQuery("");
            }}
            className={`${
              selectedCategory === "extrasanddrinks" ? "bg-pc" : ""
            } duration-300 rounded-[10px] py-1.5 px-3 md:px-4 text-[#4f2b00] text-sm md:text-base whitespace-nowrap`}
          >
            Extras/drinks
          </button>
        </div>
      </div>

      {/* Display results */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <Pizza
              key={dish.name}
              name={dish.name}
              ingredients={dish.ingredients}
              price={dish.price}
              photoName={dish.photoName}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500 text-sm md:text-base">
            No items found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Show result count */}
      {filteredDishes.length > 0 && (
        <div className="text-center mt-4 text-xs md:text-sm text-gray-500">
          Showing {filteredDishes.length} item(s)
        </div>
      )}
    </section>
  );
}
