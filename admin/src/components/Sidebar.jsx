import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} />
          <p className="hidden md:block">Add to eshop</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} />
          <p className="hidden md:block">Website items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.orders_icon} />
          <p className="hidden md:block">Online orders</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/add-to-branch"
        >
          <img className="w-5 h-5" src={assets.add_icon} />
          <p className="hidden md:block">Add to branch</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/branch-inventory"
        >
          <img className="w-5 h-5" src={assets.inventory_icon} />
          <p className="hidden md:block">Branch inventory</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/branch-sell"
        >
          <img className="w-5 h-5" src={assets.sales_icon} />
          <p className="hidden md:block">Branch sell</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/invoices"
        >
          <img className="w-5 h-5" src={assets.invoice_icon} />
          <p className="hidden md:block">Branch invoices</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/execute"
        >
          <img className="w-5 h-5" src={assets.table_icon} />
          <p className="hidden md:block">SQL Query</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
