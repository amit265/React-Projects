import React from "react";

const ItemListOneMore = ({ data }) => {
  const { id, name, description, price } = data;
  return (
    <div className="bg-white my-4 p-4 rounded-lg">
      <h1 className="text-pink-800 font-semibold">{name}</h1>
      <h3 className="text-black">₹ {price / 100}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ItemListOneMore;
