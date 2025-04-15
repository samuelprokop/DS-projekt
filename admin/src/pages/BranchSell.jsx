import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const BranchSell = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productData } = location.state || {};
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    productId: productData?.product_id || "",
    productName: productData?.name || "",
    manufacturer: productData?.manufacturer || "",
    branch: productData?.branch || "",
    quantity: 1,
    price: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return `${parseFloat(price).toFixed(2)} €`;
  };
  useEffect(() => {
    const fetchProductPrice = async () => {
      if (!formData.productId) return;

      try {
        setPriceLoading(true);
        const response = await axios.get(
          `${backendUrl}/api/branch/product/price/${formData.productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData((prev) => ({
          ...prev,
          price: response.data.data.price || "",
        }));
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch product price"
        );
      } finally {
        setPriceLoading(false);
      }
    };

    fetchProductPrice();
  }, [formData.productId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value) || 0;
    const maxQty = productData?.max_qty || 0;

    if (value < 1) value = 1;
    if (value > maxQty) value = maxQty;

    setFormData((prev) => ({
      ...prev,
      quantity: value,
    }));
  };

  const adjustQuantity = (amount) => {
    const newQuantity = formData.quantity + amount;
    const maxQty = productData?.max_qty || 0;

    if (newQuantity < 1) return;
    if (newQuantity > maxQty) return;

    setFormData((prev) => ({
      ...prev,
      quantity: newQuantity,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        product_id: formData.productId,
        product_name: formData.productName,
        manufacturer: formData.manufacturer,
        branch: formData.branch,
        quantity: formData.quantity,
        price: formData.price,
        notes: formData.notes,
      };

      const response = await axios.post(
        `${backendUrl}/api/branch/sell`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order created successfully!");
      navigate("/branch-inventory");
    } catch (error) {
      toast.error("Order creation error:", {
        error: error.response?.data,
        config: error.config,
        request: error.request,
      });
      toast.error(error.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.customerName.trim() &&
      formData.productId &&
      formData.quantity > 0 &&
      formData.price > 0
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2 border-b border-gray-200">
        Create New Sale
      </h2>

      <div className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-gray-100">
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              Product Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product ID
                </label>
                <input
                  type="text"
                  value={formData.productId}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturer
                </label>
                <input
                  type="text"
                  value={formData.manufacturer || "N/A"}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              Order Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => adjustQuantity(-1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-l-lg border border-gray-300 ${
                      formData.quantity <= 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-black hover:bg-gray-50"
                    } transition-colors focus:outline-none focus:ring-1 focus:ring-gray-300`}
                    disabled={formData.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={productData?.max_qty || 1}
                    className="w-16 h-8 border-t border-b border-gray-300 px-3 py-1 text-center focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => adjustQuantity(1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-r-lg border border-gray-300 ${
                      formData.quantity >= (productData?.max_qty || 1)
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-black hover:bg-gray-50"
                    } transition-colors focus:outline-none focus:ring-1 focus:ring-gray-300`}
                    disabled={formData.quantity >= (productData?.max_qty || 1)}
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Available: {productData?.max_qty || 0} units
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price
                </label>
                <div className="flex items-center h-10">
                  {priceLoading ? (
                    <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
                  ) : (
                    <span className="text-gray-700">
                      {formData.price ? formatPrice(formData.price) : "N/A"}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Price
                </label>
                <div className="flex items-center h-10">
                  {priceLoading ? (
                    <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
                  ) : (
                    <span className="font-medium text-gray-900">
                      {formData.price
                        ? formatPrice(
                            parseFloat(formData.price) * formData.quantity
                          )
                        : "N/A"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-black transition-all"
              placeholder="Any special instructions or notes..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/branch-inventory")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid() || loading}
              className={`px-5 py-2 text-sm rounded hover:bg-opacity-80 transition-all shadow ${
                isFormValid()
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Create Order"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchSell;
