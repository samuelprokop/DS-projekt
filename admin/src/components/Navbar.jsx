import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <div>
        <img src={assets.fei_logo} className="w-36" />
        <img src={assets.kemt_logo} className="w-36" />
      </div>
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-small"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
