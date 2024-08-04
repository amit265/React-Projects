import React, { useState } from "react";
import ItemListMore from "./ItemListMore";

const ItemList = ({ data}) => {
    const [showItems, setShowItems ] = useState(null);
  const handleClick = () => {
 setShowItems(!showItems);
  };

  return (
    <div>
      {data.categories.map((res, index) => (
        <div key={res.title} className="bg-green-400 p-2 rounded-lg my-2">
          <h1
            className="cursor-pointer font-semibold text-black" onClick={handleClick}
            
          >
            {res.title} ({res.itemCards.length}) 
            <span className="ml-2 text-gray-700">⬇</span>
          </h1>
          {showItems && (
            <ItemListMore
              data={res.itemCards}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
