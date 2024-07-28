import React from "react";

const CategorySelection = ({
  onSelectCategory,
  selectedCategory,
  activeCategory,
}) => {
  const categories = ["Startups", "Security", "AI", "Apps", "Tech"];
  return (
    <div className="px-4 mb-8 sm:space-x-4 lg:space-x-16 flex flex-wrap justify-around items-center border-b-2 py-5 text-gray-900 font-semibold">
      <button
        className={`lg:ml-12 ${activeCategory ? "" : "active-button"}`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`mr-2 space-x-16 ${
            activeCategory === category ? "active-button" : ""
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelection;
