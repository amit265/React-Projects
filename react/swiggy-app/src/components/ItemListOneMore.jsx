import React, { useState } from "react";
import { SWIGGY_CDN } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemListOneMore = ({ data }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const { id, name, description, price, defaultPrice, imageId } = data;

  const dispatch = useDispatch();

  const handleAddItem = (data) => {
    // Dispatch an action
    dispatch(addItem(data));

    // Set the message and show it
    setMessage(`${name} added`);
    setShowMessage(true);

    // Hide the message after 2 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className="bg-white my-4 p-4 rounded-lg flex justify-between ">
      {/* Fading message */}
      {showMessage && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full my-24 bg-green-500 text-white py-1 px-3 rounded transition-opacity duration-500">
          {message}
        </div>
      )}

      <div>
        <h1 className="text-pink-800 font-semibold">{name}</h1>
        <h3 className="text-black">
          ₹ {price / 100 ? price / 100 : defaultPrice / 100}
        </h3>
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="relative flex flex-col">
        <div className="w-32 h-32 p-2 relative">
          <img
            src={SWIGGY_CDN + imageId}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <button
          className="absolute inset-0 flex items-center justify-center rounded-full bg-red-500 text-white font-bold text-2xl opacity-75 hover:opacity-100 w-8 h-8 m-auto"
          onClick={() => handleAddItem(data)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ItemListOneMore;
