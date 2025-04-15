import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

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
];

const BranchForm = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [branches] = useState([
    "Košice",
    "Bratislava",
    "Poprad",
    "Nitra",
    "Senec",
  ]);
  const [products, setProducts] = useState([]);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isManufacturerDropdownOpen, setIsManufacturerDropdownOpen] =
    useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/products/basic`);
        if (res.data.success && res.data.products.length > 0) {
          setProducts(res.data.products);
        } else {
          toast.warn("No products returned!");
        }
      } catch (error) {
        toast.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !selectedBranch ||
      !selectedManufacturer ||
      !selectedProduct ||
      !quantity
    ) {
      toast.alert("Please fill in all fields.");
      return;
    }
  };
  const Dropdown = ({
    label,
    selected,
    setSelected,
    options,
    isOpen,
    setIsOpen,
  }) => (
    <div className="mb-6">
      <p className="mb-1">{label}</p>
      <div className="relative">
        <button
          className="flex items-center justify-between w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 bg-white text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selected || `Select ${label}`}</span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform ${
              isOpen ? "rotate-180" : ""
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
        {isOpen && (
          <div className="absolute z-10 w-full md:w-64 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  selected === option ? "bg-gray-100 font-medium" : ""
                }`}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-section">
        <h2 className="section-label">Branch</h2>
        <Dropdown
          label="Branch"
          selected={selectedBranch}
          setSelected={setSelectedBranch}
          options={[...branches].sort()}
          isOpen={isBranchDropdownOpen}
          setIsOpen={setIsBranchDropdownOpen}
        />
      </div>
      <div className="form-section">
        <h2 className="section-label">Manufacturer</h2>
        <Dropdown
          label="Manufacturer"
          selected={selectedManufacturer}
          setSelected={setSelectedManufacturer}
          options={manufacturers}
          isOpen={isManufacturerDropdownOpen}
          setIsOpen={setIsManufacturerDropdownOpen}
        />
      </div>
      <div className="form-section">
        <h2 className="section-label">Product</h2>
        <Dropdown
          label="Product"
          selected={selectedProduct?.name}
          setSelected={(name) => {
            const product = products.find((p) => p.name === name);
            setSelectedProduct(product);
          }}
          options={products.map((p) => p.name)}
          isOpen={isProductDropdownOpen}
          setIsOpen={setIsProductDropdownOpen}
        />
      </div>
      <div className="form-section">
        <p className="section-label">Quantity</p>
        <input
          type="number"
          min="1"
          className="text-input"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(event) => setQuantity(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-btn">
        ADD TO BRANCH
      </button>
    </form>
  );
};

export default BranchForm;
