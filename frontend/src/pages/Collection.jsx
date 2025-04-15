import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products);
  const [category, setCategory] = useState([]);
  const [branch, setBranch] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const categories = ["nahradne_diely", "prislusenstvo"];
  const branches = [
    "Bánska Bystrica",
    "Bratislava",
    "Handlová",
    "Košice",
    "Liptovský Mikuláš",
    "Nitra",
    "Nové Zámky",
    "Poprad",
    "Prešov",
    "Prievidza",
    "Rožňava",
    "Senec",
    "Trenčín",
    "Zvolen",
    "Online",
  ];

  const sortOptions = [
    { value: "relevant", label: "Sort by: Relevant" },
    { value: "low-high", label: "Sort by: Low to High" },
    { value: "high-low", label: "Sort by: High to Low" },
  ];

  const toggleCategory = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleBranch = (event) => {
    const value = event.target.value;
    setBranch((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (branch.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        try {
          let branches = [];

          if (!item.subCategory) {
            return false;
          } else if (Array.isArray(item.subCategory)) {
            branches = item.subCategory;
          } else if (typeof item.subCategory === "string") {
            try {
              branches = JSON.parse(item.subCategory);
              if (!Array.isArray(branches)) branches = [];
            } catch (event) {
              branches = item.subCategory.split(",").map((b) => b.trim());
            }
          }

          return branches.some((branch) => branch.includes(branch));
        } catch (event) {
          return false;
        }
      });
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        fpCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(fpCopy);
  };

  useEffect(() => {
    setFilterProducts(products);
    applyFilter();
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, branch, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((cat, index) => (
              <p key={index} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                {cat === "nahradne_diely" ? "Náhradne diely" : "Príslušenstvo"}
              </p>
            ))}
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">BRANCHES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {branches.map((br, index) => (
              <p key={index} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={br}
                  onChange={toggleBranch}
                  checked={branch.includes(br)}
                />
                {br}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <div className="relative">
            <button
              className="flex items-center justify-between border-2 border-gray-300 px-4 py-2 bg-white text-left text-sm"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            >
              <span>
                {sortOptions.find((option) => option.value === sortType)
                  ?.label || "Sort by"}
              </span>
              <svg
                className={`w-5 h-5 ml-2 transition-transform ${
                  isSortDropdownOpen ? "rotate-180" : ""
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

            {isSortDropdownOpen && (
              <div className="absolute z-10 right-0 mt-1 w-full bg-white border-2 border-gray-300 rounded-md shadow-lg">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                      sortType === option.value ? "bg-gray-100 font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortType(option.value);
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image_url={item.image_url || item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
