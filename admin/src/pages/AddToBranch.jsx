import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddToBranch = () => {
  const [openBranchDropdown, setOpenBranchDropdown] = useState(false);
  const [branchChosen, setBranchChosen] = useState(null);
  const cities = ["Bratislava", "Košice", "Nitra", "Poprad", "Senec"].sort();

  const [openPartDropdown, setOpenPartDropdown] = useState(false);
  const [partChosen, setPartChosen] = useState(null);
  const [parts, setParts] = useState([]);
  const [loadingParts, setLoadingParts] = useState(true);

  const [openManufacturerDropdown, setOpenManufacturerDropdown] =
    useState(false);
  const [manufacturerChosen, setManufacturerChosen] = useState(null);
  const manufacturers = [
    "Audi",
    "BMW",
    "Ford",
    "Honda",
    "Mercedes",
    "Seat",
    "Škoda",
    "Toyota",
    "Volkswagen",
    "Volvo",
    "Universal"
  ].sort();

  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);
        setParts(response.data.products);
      } catch (error) {
        toast.error("Error fetching parts:", error);
      } finally {
        setLoadingParts(false);
      }
    };

    fetchParts();
  }, []);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const getBranchCode = (city) => {
    const branchMap = {
      Bratislava: "bl",
      Košice: "ke",
      Nitra: "nr",
      Poprad: "pp",
      Senec: "sc",
    };
    return branchMap[city];
  };

  const handleAddToBranch = async () => {
    if (!branchChosen || !partChosen || !manufacturerChosen) {
      toast.error("Please select branch, manufacturer, and part");
      return;
    }
  
    try {
      setIsSubmitting(true);
      const branchCode = getBranchCode(branchChosen);
  
      const response = await axios.post(
        `${backendUrl}/api/branch/add`,
        {
          branch: branchCode,
          product_id: partChosen._id,
          product_name: partChosen.name,
          qty: quantity,
          manufacturer: manufacturerChosen,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
  
      if (response.data.success) {
        toast.success("Item added to branch successfully!");
        // Clear all input fields
        setBranchChosen(null);
        setManufacturerChosen(null);
        setPartChosen(null);
        setQuantity(1);
      } else {
        toast.error(response.data.message || "Failed to add item");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to branch");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2 border-b border-gray-200">
        Add Products to Branch
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-100 hover:border-gray-200 transition-colors md:col-span-1">
          <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
            Branch Selection
          </h4>
          <div className="mt-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Choose Branch
            </label>
            <div className="relative">
              <button
                className={`flex items-center justify-between w-full border ${
                  branchChosen ? "border-black" : "border-gray-200"
                } rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-left transition-all hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black`}
                onClick={() => setOpenBranchDropdown(!openBranchDropdown)}
              >
                <span
                  className={`text-sm ${
                    branchChosen ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {branchChosen || "..."}
                </span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform text-gray-400 ${
                    openBranchDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openBranchDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {cities.map((city) => (
                    <button
                      key={city}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        branchChosen === city
                          ? "bg-gray-50 text-black font-medium"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setBranchChosen(city);
                        setOpenBranchDropdown(false);
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-100 hover:border-gray-200 transition-colors md:col-span-1">
          <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
            Manufacturer
          </h4>
          <div className="mt-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Choose Manufacturer
            </label>
            <div className="relative">
              <button
                className={`flex items-center justify-between w-full border ${
                  manufacturerChosen ? "border-black" : "border-gray-200"
                } rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-left transition-all hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black`}
                onClick={() =>
                  setOpenManufacturerDropdown(!openManufacturerDropdown)
                }
              >
                <span
                  className={`text-sm ${
                    manufacturerChosen ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {manufacturerChosen || "..."}
                </span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform text-gray-400 ${
                    openManufacturerDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openManufacturerDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {manufacturers.map((manufacturer) => (
                    <button
                      key={manufacturer}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        manufacturerChosen === manufacturer
                          ? "bg-gray-50 text-black font-medium"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setManufacturerChosen(manufacturer);
                        setOpenManufacturerDropdown(false);
                      }}
                    >
                      {manufacturer}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-100 hover:border-gray-200 transition-colors md:col-span-1">
          <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
            Part Selection
          </h4>
          <div className="mt-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Choose Part
            </label>
            <div className="relative">
              <button
                className={`flex items-center justify-between w-full border ${
                  partChosen ? "border-black" : "border-gray-200"
                } rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-left transition-all hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black ${
                  loadingParts ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={() => setOpenPartDropdown(!openPartDropdown)}
                disabled={loadingParts}
              >
                <span
                  className={`text-sm ${
                    partChosen ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {loadingParts ? "..." : partChosen?.name || "..."}
                </span>
                {!loadingParts && (
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform text-gray-400 ${
                      openPartDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>

              {openPartDropdown && !loadingParts && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {parts.map((part) => (
                    <button
                      key={part._id}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        partChosen?._id === part._id
                          ? "bg-gray-50 text-black font-medium"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setPartChosen(part);
                        setOpenPartDropdown(false);
                      }}
                    >
                      {part.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-100 hover:border-gray-200 transition-colors md:col-span-1">
          <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
            Quantity
          </h4>
          <div className="mt-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Enter Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black transition-all text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex justify-center">
        <button
          onClick={handleAddToBranch}
          disabled={isSubmitting}
          className={`bg-black text-white px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm rounded-lg hover:bg-opacity-80 transition-all shadow-md ${
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "active:bg-gray-700"
          }`}
        >
          {isSubmitting ? "ADDING..." : "ADD TO BRANCH"}
        </button>
      </div>

      <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-white rounded-xl shadow-xs border border-gray-100">
        <h3 className="font-medium text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider border-b pb-2">
          Selected Options
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <p className="flex items-center">
            <span className="text-gray-500 w-24 sm:w-32">Branch:</span>
            <span className="font-medium text-gray-800 truncate">
              {branchChosen || "None"}
            </span>
          </p>
          <p className="flex items-center">
            <span className="text-gray-500 w-24 sm:w-32">Manufacturer:</span>
            <span className="font-medium text-gray-800 truncate">
              {manufacturerChosen || "None"}
            </span>
          </p>
          <p className="flex items-center">
            <span className="text-gray-500 w-24 sm:w-32">Part:</span>
            <span className="font-medium text-gray-800 truncate">
              {partChosen
                ? `${partChosen.name} (ID: ${partChosen._id})`
                : "None"}
            </span>
          </p>
          <p className="flex items-center">
            <span className="text-gray-500 w-24 sm:w-32">Quantity:</span>
            <span className="font-medium text-gray-800">{quantity}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddToBranch;
