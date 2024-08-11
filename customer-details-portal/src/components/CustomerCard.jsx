import React, { forwardRef } from "react";

const CustomerCard = forwardRef(({ customer, isSelected, onSelect }, ref) => {
  return (
    <div
      ref={ref}
      className={`p-4 shadow-md cursor-pointer botder-1 border-[#000000] ${
        isSelected ? "bg-gray-400" : ""
      }`}
      onClick={() => onSelect(customer.id)}
    >
      <h1 className="text-xl py-4">Customer {customer.id}</h1>
      <h3 className="text-black font-bold text-xl">
        Name: {customer.first + " " + customer.last}
      </h3>
      <p className="text-gray-800 text-lg">{customer.country}</p>
    </div>
  );
});
CustomerCard.displayName = "CustomerCard";

export default CustomerCard;
