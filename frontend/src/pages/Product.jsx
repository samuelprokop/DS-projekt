import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const imgRef = useRef(null);
  const fetchProductData = async () => {
    const foundProduct = products.find(
      (item) => String(item._id) === productId
    );
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image_url || "");
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  const handleManufacturerSelect = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setIsDropdownOpen(false);
  };
  const handleAddToCart = () => {
    if (!selectedManufacturer) {
      toast.error("Please select a product brand");
      return;
    }
    addToCart(String(productData._id), selectedManufacturer);
  };
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="w-full sm:w-1/2">
          {image && (
            <div className="relative max-w-[500px]">
              <div
                className={`relative transition-all duration-300 ${
                  isHovered ? "scale-[1.02]" : "scale-100"
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  ref={imgRef}
                  className={`w-full h-auto rounded-lg shadow-lg border-4 ${
                    isHovered
                      ? "border-gray-400 shadow-xl cursor-pointer"
                      : "border-gray-200"
                  } transition-all duration-300`}
                  src={image}
                />
                {isHovered && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <span className="text-white font-medium text-lg bg-black bg-opacity-50 px-3 py-1 rounded-full">
                      Click to Zoom
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full sm:w-1/2">
          <h1 className="font-medium text-2xl mb-2"> {productData.name}</h1>

          <div className="flex items-center gap-1 mb-4">
            <img src={assets.star_icon} className="w-4 h-4" />
            <img src={assets.star_icon} className="w-4 h-4" />
            <img src={assets.star_icon} className="w-4 h-4" />
            <img src={assets.star_icon} className="w-4 h-4" />
            <img src={assets.star_dull_icon} className="w-4 h-4" />
            <p className="pl-2 ml-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {productData.price}
            {currency}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <p className="mt-2 text-gray-700 font-medium md:w-4/5">
            {productData.cta}
          </p>

          {productData.manufacturer?.length > 0 && (
            <div className="flex flex-col gap-1 my-8">
              <p>Select Brand</p>
              <div className="relative">
                <button
                  className="flex items-center justify-between w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 bg-white text-left"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedManufacturer || "Select Manufacturer"}</span>
                  <svg
                    className={`w-5 h-5 ml-2 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
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
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full md:w-64 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {productData.manufacturer.map((item, index) => (
                      <button
                        key={index}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          selectedManufacturer === item
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                        onClick={() => handleManufacturerSelect(item)}
                      >
                        {" "}
                        {item}{" "}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-5 rounded-lg hover:bg-opacity-70 transition-all"
                >
                  ADD TO CART
                </button>
                <hr className="mt-8 sm:w-4/5" />
                <div className="text-sm text-gray-400 mt-5 flex-col gap-1">
                  <p>100% Original product.</p>
                  <p>Cash on delivery is available at this product.</p>
                  <p>Easy return and exchange policy within 7 days.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
          >
            <button
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <div className="bg-white p-1 rounded-lg border-4 border-gray-300">
              <img
                className="max-w-[80vw] max-h-[80vh]"
                src={image}
                style={{
                  width:
                    imgRef.current?.naturalWidth < 800
                      ? imgRef.current.naturalWidth
                      : "auto",
                  height:
                    imgRef.current?.naturalHeight < 800
                      ? imgRef.current.naturalHeight
                      : "auto",
                  maxWidth: "80vw",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        manufacturer={productData.manufacturer}
      />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading product details...</p>
    </div>
  );
};

export default Product;
