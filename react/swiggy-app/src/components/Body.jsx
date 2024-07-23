import React, { useEffect, useState } from "react";
import Card from "./Card";
import { BASE_URL, SWIGGY_API, SWIGGY_PATNA } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useResAPI from "../utils/useResAPI";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [search, setSearch] = useState("");

  const { resInfo, loading, error } = useResAPI(SWIGGY_API);
  useEffect(() => {
    if (resInfo) {
      const resData =
        resInfo?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setResList(resData);
      setFilteredResList(resData);
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
    console.log(filterRes);
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

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          name=""
          id=""
          value={search}
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="button">
        <button
          className="filter"
          onClick={() => setFilteredResList(resList)}
          style={{ backgroundColor: "green" }}
        >
          All
        </button>

        <button className="filter" onClick={filter}>
          Top Ten
        </button>
        <button className="filter" onClick={filterFastest}>
          Fastest
        </button>
      </div>

      <div className="card-container">
        {filteredResList.map((res) => (
          <Link key={res.info.id} to={BASE_URL+"/" + res.info.id}>
            <Card data={res} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
