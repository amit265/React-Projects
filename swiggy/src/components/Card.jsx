import React from "react";
import { SWIGGY_CDN } from "../utils/constants";

const Card = ({ data }) => {
  const { name, cloudinaryImageId, cuisines, avgRating, costForTwo, sla } =
    data.info;

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 hover:shadow-2xl">
      <div className="h-48 overflow-hidden">
        <img
          className="object-contain rounded-t-lg"
          src={SWIGGY_CDN + cloudinaryImageId}
          alt=""
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="mb-1 text-base font-normal text-gray-700 dark:text-gray-400">
          <span className="text-green-600 text-lg">✪</span> {avgRating}
        </p>
        <p className="mb-1 text-base font-normal text-gray-700 dark:text-gray-400">
          {sla.slaString}
        </p>
        <p className="mb-1 text-base font-normal text-gray-700 dark:text-gray-400">
          {costForTwo}
        </p>
        <p className="text-base font-normal text-gray-700 dark:text-gray-400">
          {cuisines.slice(0, 3).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Card;
