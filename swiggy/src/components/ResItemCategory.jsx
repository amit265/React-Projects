import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import FlashMessage from "./FlashMessage";

const ResItemCategory = ({ data, showItems, setShowIndex }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setShowIndex();
  };

  // console.log("data", data.categories.length);
 

  return (
    <div className="m-2 bg-purple-800 text-white p-2 rounded-lg shadow-lg">
      <h1
        className="cursor-pointer font-bold text-xl flex justify-between "
        onClick={handleClick}
      >
        {data.title} ({data.categories.length})
        <span className="text-2xl mr-4">⬇</span>
      </h1>
      {showItems && <ItemList data={data} />}
    
    </div>
  );
};

export default ResItemCategory;
