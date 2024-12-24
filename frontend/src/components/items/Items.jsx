import React, { useEffect } from "react";
import Item from "./Item";
import { getCountByType, getProducts } from "../../services/product";

const Items = ({ triggerLoad, selectedCategory }) => {
  const [items, setItems] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    const category =
      selectedCategory === "All"
        ? null
        : selectedCategory.toLowerCase().slice(0, -1);
    getProducts(category).then((data) => {
      setItems(data);
    });
    getCountByType().then((data) => {
      console.log(data);
      setCategories({
        All: data.total,
        Fruits: data?.fruit || 0,
        Vegetables: data?.vegetable || 0,
        Meats: data?.meat || 0,
      });
    });
  }, [triggerLoad, selectedCategory]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 w-[1396px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-[#333333]">
            {selectedCategory}
          </h2>
          <h4 className="text-sm text-[#333333]">
            Displaying {filteredItems.length} out of {categories.All} items
          </h4>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-3.5 border-2 border-[#D4D4D4] rounded-lg">
            <img src="src/assets/search.svg" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Recherche"
              className="w-[320px] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-[#396C95] text-white rounded-[4px]">
            <img src="src/assets/plus.svg" />
            New Item
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredItems.length > 0 &&
          filteredItems.map((item, index) => (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              weight={item.weight}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default Items;
