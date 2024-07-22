import React from "react";
import { SWIGGY_CDN } from "../utils/constants";

const Card = ({ data }) => {
  const { name, cloudinaryImageId, cuisines, avgRating, costForTwo, sla } =
    data.info;

    
    // console.log(cuisines, name);
  return (
    <>
        <div className="card">
          <img
            className="res-logo"
            src={SWIGGY_CDN + cloudinaryImageId}
            alt=""
          />
          <h3 className="res-name">{name}</h3>
          <p className="rating pfont">
            <span>✪</span>
            {" " + avgRating + " "}
          </p>
          <p className="time pfont">{sla.slaString}</p>
          <p className="price">{costForTwo}</p>
          <p className="cuisine">{cuisines.slice(1, 4).join(", ")}</p>
        </div>
    </>
  );
};

export default Card;
