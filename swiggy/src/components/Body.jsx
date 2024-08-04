import React, { useEffect, useState } from "react";
import Card from "./Card";
import { BASE_URL, SWIGGY_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useResAPI from "../utils/useResAPI";
import resDataOffline from "../utils/resDataOffline.json";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [search, setSearch] = useState("");
  // console.log("resDataOfflin", resDataOffline);
  const { resInfo, loading, error } = useResAPI(SWIGGY_API);
  useEffect(() => {
    if (resInfo) {
      const resData =
        resInfo?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      // console.log(resData);
      setResList(resData);
      setFilteredResList(resData);
    } else {
      setResList(resDataOffline);
      setFilteredResList(resDataOffline);
    }
  }, [resInfo]);

  const handleSearch = () => {
    const filteredCity = resList.filter((res) =>
      res.info.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredResList(filteredCity);
  };

  const filter = () => {
    const filterRes = resList.filter((res) => res.info.avgRating > 4);
    setFilteredResList(filterRes.slice(0, 10));
  };

  const filterFastest = () => {
    const filterRes = resList.sort(
      (a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime
    );
    setFilteredResList(filterRes); // Create a new array to trigger re-render
  };

  if (loading) {
    return <Shimmer />;
  }

  if (error && !resDataOffline) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="w-10/12 mx-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="relative sm:w-6/12 w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            required
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>

        <div className="mb-2">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => setFilteredResList(resList)}
          >
            All
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={filter}
          >
            Top Ten
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={filterFastest}
          >
            Fastest
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 w-full justify-center">
        {filteredResList.map((res) => (
          <Link key={res.info.id} to={BASE_URL + "/" + res.info.id}>
            <Card data={res} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
