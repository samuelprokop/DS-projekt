import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 my-5 rounded-full w-3/4 sm:w-1/2">
        <div className="flex items-center flex-1">
          <img src={assets.search_icon} className="w-4 h-4 mr-3" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="flex-1 outline-none bg-inherit text-sm"
            placeholder="Search..."
          />
        </div>
        <img
          src={assets.cross_icon}
          className="inline w-4 h-4 ml-2 cursor-pointer"
          onClick={() => setShowSearch(false)}
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
