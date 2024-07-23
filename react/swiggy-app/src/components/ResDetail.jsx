import { Link, useParams } from "react-router-dom";
import { BASE_URL, SWIGGY_CDN, SWIGGY_RES_API } from "../utils/constants";
import useResAPI from "../utils/useResAPI";
import ShimmerRes from "./ShimmerRes";
import ResItemCategory from "./ResItemCategory";
import { useState } from "react";

const ResDetail = () => {
  const { resId } = useParams();
  const { resInfo, loading, error } = useResAPI(SWIGGY_RES_API + resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <ShimmerRes />;
  const resData = resInfo?.data?.cards[2]?.card?.card?.info;
  const { name, cloudinaryImageId, locality, city, cuisines } = resData;

  const resItemCategory =
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards;
  const filterNestedCategory = resItemCategory.filter(
    (res) =>
      res?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
  );

  if (loading) {
    return <ShimmerRes />;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  console.log("filterNestedCategory", filterNestedCategory);
  console.log("resItemCategory", resItemCategory);

  return (
    <>
      <div className="mx-auto bg-white flex w-8/12 mt-8 p-4 rounded-lg justify-between shadow-lg">
        <div className="flex flex-col justify-around">
          <div>
            <h1 className="font-bold text-lg">{name}</h1>
          </div>
          <div>
            <p>
              Location : {locality}, {city}
            </p>
            <p className="text-gray-600">Cuisines : {cuisines.join(", ")}</p>
          </div>
        </div>

        <div>
          <img
            className="rounded-lg shadow-lg w-36 "
            src={SWIGGY_CDN + cloudinaryImageId}
            alt={name}
          />
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg w-10/12 mx-auto">
        <h1 className="text-center text-2xl text-black font-bold">Main Menu</h1>
        {filterNestedCategory.length === 0 ? (
          <div>
            <h1 className="fonr-bold text-center mt-4">
              There is no menu available for{" "}
              <span className="font-bold underline">{name}</span>
            </h1>{" "}
            <Link to={BASE_URL+"/"}>
              <h2 className="text-center p-4 shadow-lg font-bold text-red-600">
                Go to Restaurant
              </h2>
            </Link>
          </div>
        ) : (
          filterNestedCategory.map((res, index) => (
            <ResItemCategory
              key={res.card.card.title}
              data={res.card.card}
              showItems={index === showIndex ? true : false}
              setShowIndex={() => setShowIndex(index)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ResDetail;
