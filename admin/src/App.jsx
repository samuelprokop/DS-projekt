import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import AddToBranch from "./pages/AddToBranch";
import ViewBranchInventory from "./pages/ViewBranchInventory";
import BranchSell from "./pages/BranchSell";
import BranchInvoices from "./pages/BranchInvoices";
import SQLQuery from "./pages/SQLQuery";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "€";
export const branches = ["Košice", "Bratislava", "Poprad", "Nitra", "Senec"];

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route
                  path="/add-to-branch"
                  element={<AddToBranch token={token} />}
                />
                <Route
                  path="/branch-inventory"
                  element={<ViewBranchInventory token={token} />}
                />
                <Route
                  path="/branch-sell"
                  element={<BranchSell token={token} />}
                />
                <Route
                  path="/invoices"
                  element={<BranchInvoices token={token} />}
                />
                <Route path="/execute" element={<SQLQuery token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
