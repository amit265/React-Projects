import { useState, useEffect } from "react";
import { SWIGGY_CDN } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const CartList = ({ data }) => {
  const dispatch = useDispatch();
  const { id, name, description, price, defaultPrice, imageId, quantity } = data;
  const validPrice = (price ? price : defaultPrice) / 100;
  const handleAddItem = () => {
    //dispatch an action
    dispatch(addItem({ id })); 
  };
  const handleRemoveItem = () => {
    //dispatch an action
    dispatch(removeItem({ id })); // Dispatch remove item action with item id
  };

  const totalItemPrice = (validPrice * quantity).toFixed(2);

  return (
    <div className="bg-white my-4 p-4 rounded-lg flex justify-between">
      <div>
        <div className="my-auto">
          <img src={SWIGGY_CDN + imageId} alt="" className="object-contain rounded-lg w-36 h-36" />
        </div>
      </div>
      <div className="flex flex-col justify-between text-right">
        <h1 className="text-pink-800 font-semibold w-36">{name}</h1>
        <h3 className="text-black">₹ {validPrice}</h3>
        <div className="flex gap-2 justify-end">
          <h4 onClick={handleRemoveItem} className="text-lg font-bold cursor-pointer px-2 shadow-lg">-</h4>

          <h4 className="text-lg font-bold cursor-pointer shadow-lg">
            {quantity}
          </h4>
          <h4 onClick={handleAddItem} className="text-lg font-bold cursor-pointer px-2 shadow-lg">+</h4>
        </div>
        <h3 className="text-black">
          Total: ₹ {totalItemPrice}
        </h3>
        </div>
    </div>
  );
};

export default CartList;
