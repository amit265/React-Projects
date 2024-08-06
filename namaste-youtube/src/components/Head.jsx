import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [json, setJson] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(searchQuery);
      if (searchCache[searchQuery]) {
        setJson(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log("api call -" + searchQuery);
    const data = await fetch(SEARCH_API + searchQuery);
    const json = await data.json();
    setJson(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
    console.log("json", json[1]);
  };

  return (
    <div className="grid grid-flow-col shadow-lg p-5">
      <div className="flex items-center gap-2 col-span-1">
        <RxHamburgerMenu onClick={() => toggleMenuHandler()} />
        <img
          className="h-8"
          src="https://www.youtube.com/s/desktop/103479f3/img/favicon_144x144.png"
          alt="logo"
        />
      </div>
      <div className="col-span-10 text-center">
        <div>
          <input
            className="w-1/2 p-2 border align-middle border-gray-400 rounded-l-full"
            placeholder="Search"
            type="text"
            // onFocus={setShowSuggestions(true)}
            // onBlur={setShowSuggestions(false)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="align-middle p-3 rounded-r-full border border-gray-400">
            <CiSearch />
          </button>
          {
            <div className="fixed bg-white py-2 px-5 w-56 ml-40">
              <ul>{json && json.map((a) => <li key={a}>{a}</li>)}</ul>
            </div>
          }
        </div>
      </div>
      <div className="col-span-1">
        <FaRegCircleUser />
      </div>
    </div>
  );
};

export default Head;
