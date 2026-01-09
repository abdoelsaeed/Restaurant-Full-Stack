import ItemComponent from "./ItemComponent";

interface MenuItemsProps {
  name: string;
  id: string;
  price: number;
  ingredients: string;
}
const menuItems: MenuItemsProps[] = [
  {
    id: "1",
    name: "Classic Cheeseburger",
    price: 12.99,
    ingredients: "Beef patty, cheddar cheese, lettuce, tomato, onion, pickles",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    price: 14.5,
    ingredients: "Tomato sauce, fresh mozzarella, basil, olive oil",
  },
  {
    id: "3",
    name: "Grilled Chicken Salad",
    price: 11.75,
    ingredients:
      "Grilled chicken, mixed greens, cherry tomatoes, cucumber, vinaigrette",
  },
  {
    id: "4",
    name: "Spaghetti Bolognese",
    price: 13.99,
    ingredients: "Spaghetti, beef ragu, parmesan cheese, herbs",
  },
  {
    id: "5",
    name: "Fish & Chips",
    price: 15.25,
    ingredients: "Battered cod, crispy fries, tartar sauce, lemon wedge",
  },
  {
    id: "6",
    name: "Caesar Salad",
    price: 10.5,
    ingredients: "Romaine lettuce, croutons, parmesan, Caesar dressing",
  },
  {
    id: "7",
    name: "Chocolate Lava Cake",
    price: 8.75,
    ingredients: "Warm chocolate cake, molten center, vanilla ice cream",
  },
];

export default function MenuItems() {
  return (
    <div className="mt-4 w-full lg:flex-1 max-w-full lg:max-w-[600px] px-4 sm:px-6 md:px-0 ">
      {menuItems?.map((item) => (
        <ItemComponent
          name={item.name}
          id={item.id}
          price={item.price}
          ingredients={item.ingredients}
          key={item.id}
        />
      ))}
    </div>
  );
}
