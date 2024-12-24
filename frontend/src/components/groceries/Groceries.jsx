import React, { useEffect } from "react";
import { getCountByType } from "../../services/product";

const Groceries = ({ triggerLoad, selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    getCountByType().then((data) => {
      console.log(data);
      setCategories([
        {
          name: "All",
          count: data.total,
        },
        {
          name: "Fruits",
          count: data?.fruit || 0,
        },
        {
          name: "Vegetables",
          count: data?.vegetable || 0,
        },
        {
          name: "Meats",
          count: data?.meat || 0,
        },
      ]);
    });
  }, [triggerLoad]);

  return (
    <div className="flex flex-col gap-4 w-[224px]">
      <h2 className="text-xl font-bold text-[#333333]">Groceries</h2>
      <div className="border border-[#C4C4C4]">
        <div className="flex items-center justify-center h-[60px] text-[#191919] cursor-pointer">
          + New list
        </div>
        <div>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-5 text-sm text-[#191919] cursor-pointer ${
                index !== categories.length && "border-t border-[#C4C4C4]"
              } ${
                selectedCategory === category.name
                  ? "bg-[#EDF0FF] pl-3 border-l-4 border-l-[#32A7FC]"
                  : "hover:bg-[#EDF0FF]"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
              <span className="text-xs text-[#666666]">
                ({category.count} items)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groceries;
