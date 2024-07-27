import { Link, useParams } from "react-router-dom";
import { BASE_URL, SWIGGY_CDN, SWIGGY_RES_API } from "../utils/constants";
import useResAPI from "../utils/useResAPI";
import ShimmerRes from "./ShimmerRes";
import ResItemCategory from "./ResItemCategory";
import { useEffect, useState } from "react";
import FlashMessageGeneral from "./FlashMessageGeneral";

const ResDetail = () => {
  const { resId } = useParams();
  const { resInfo, loading, error } = useResAPI(SWIGGY_RES_API + resId);
  const [showIndex, setShowIndex] = useState(null);


  if (resInfo === null)
    return (
      <>
        <div className="flex flex-col my-12 items-center max-w-md mx-auto">
          <h1 className="font-semibold text-center p-4 m-4">
            If you are not offline, then you need cors bypass to view this page,
            you can download plugin for that, use it temporarily then remove it.
          </h1>
          <p className="text-red-700 p-4">
            Click on the link below to download CORS plugin
          </p>
          <a
            className="hover:text-blue-700 hover:bg-green-500 bg-pink-400 p-2 m-2"
            href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome : Allow CORS
          </a>
          <a
            className="hover:text-blue-700 hover:bg-green-500 bg-pink-400 p-2 m-2"
            href="https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla : CORS Everywhere
          </a>
        </div>
        <ShimmerRes />
      </>
    );

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
    return <div>Error fetching data : {error}</div>;
  }

  return (
    <>
      <div className="mx-auto bg-white flex w-10/12 sm:w-1/2 mt-8 p-4 rounded-lg justify-between shadow-lg">
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

      <div className="mt-8 p-4 rounded-lg w-10/12 sm:w-1/2 mx-auto shadow-lg">
        <div className="flex justify-between">
          <h1 className="mx-4 p-4 text-xl text-black font-bold">Main Menu</h1>
          <Link to={BASE_URL + "/"}>
            <h2 className="mx-4 p-4 shadow-lg font-bold text-red-600 hover:bg-gray-300">
              Go to Restaurant
            </h2>
          </Link>
        </div>
        {filterNestedCategory.length === 0 ? (
          <FlashMessageGeneral message={name} />
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
