import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orderNumber } = useParams();
  const { backendUrl, token, navigate, delivery_fee } = useContext(ShopContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusConfig = {
    "Order Placed": {
      bg: "bg-yellow-50",
      text: "text-yellow-500",
      border: "border-yellow-100",
      dot: "bg-yellow-500",
    },
    "Order Sent": {
      bg: "bg-orange-50",
      text: "text-orange-500",
      border: "border-orange-100",
      dot: "bg-orange-500",
    },
    "Order Delivered": {
      bg: "bg-green-50",
      text: "text-green-500",
      border: "border-green-100",
      dot: "bg-green-500",
    },
    "Order Canceled": {
      bg: "bg-red-50",
      text: "text-red-500",
      border: "border-red-100",
      dot: "bg-red-500",
    },
    default: {
      bg: "bg-blue-50",
      text: "text-blue-500",
      border: "border-blue-100",
      dot: "bg-blue-500",
    },
  };

  const statusStyle = statusConfig[order?.status] || statusConfig["default"];

  const formatPrice = (price) => {
    const num = typeof price === "number" ? price : parseFloat(price || 0);
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateSubtotal = () => {
    if (!order || !order.items) return 0;
    const sum = order.items.reduce((sum, item) => {
      const price =
        typeof item.price === "number"
          ? item.price
          : parseFloat(item.price || 0);
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);
    return parseFloat(sum.toFixed(2));
  };

  const subtotal = calculateSubtotal();
  const shipping =
    typeof delivery_fee === "number"
      ? delivery_fee
      : parseFloat(delivery_fee || 0);
  const total = subtotal + shipping;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await axios.get(
          `${backendUrl}/api/order/details/${orderNumber}`,
          {
            headers: { Authorization: `Bearer ${token}`, token: token },
          }
        );

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to load order");
        }

        setOrder(response.data.order);
      } catch (err) {
        toast.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderNumber, token, backendUrl]);

  if (!token) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
        <p className="mb-4">Please login to view order details</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Error</h2>
        <p className="mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Order # {order.order_number}</h1>
        <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {new Date(order.created_at).toLocaleDateString()}
        </span>
      </div>

      <div
        className={`p-4 rounded-lg mb-8 border ${statusStyle.bg} ${statusStyle.border}`}
      >
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 ${statusStyle.dot}`}></div>
          <p className={`font-medium ${statusStyle.text}`}>{order.status}</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <h2 className="text-lg font-semibold border-b pb-2">Items</h2>
        {Array.isArray(order.items) &&
          order.items.map((item, index) => (
            <div key={index} className="flex border-b pb-6">
              <div className="w-24 h-24 rounded-md overflow-hidden mr-4 flex-shrink-0 bg-gray-100">
                <img
                  src={item.image_url}
                  className="w-full h-full object-cover bg-gray-100"
                  onError={(event) => {
                    event.target.src = "/placeholder-product.png";
                    event.target.classList.add("bg-gray-100");
                  }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.name} </h3>
                <p className="text-sm text-gray-600">{item.manufacturer}</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-gray-500">
                    Quantity: {item.quantity}
                  </span>
                  <span className="ml-4 font-medium text-gray-900">
                    {formatPrice(item.price)} €
                  </span>
                  {item.quantity > 1 && (
                    <span className="ml-2 text-gray-500">
                      ({formatPrice(item.price * item.quantity)} € total)
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-5">
              <div className="flex items-center mb-4">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${statusStyle.dot} transition-colors hover:scale-110`}
                ></div>
                <h2 className="text-lg font-semibold">Shipping Address</h2>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-medium">
                  {order.first_name} {order.last_name}
                </p>
                <p className="text-gray-600">{order.email}</p>
                <p className="mt-2">{order.street}</p>
                <p>
                  {order.city}, {order.state} {order.zip_code}
                </p>
                <p>{order.country}</p>
                <p className="text-gray-500 mt-2">Phone: {order.phone}</p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center mb-4">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${statusStyle.dot} transition-colors hover:scale-110`}
                ></div>
                <h2 className="text-lg font-semibold">Payment Method</h2>
              </div>
              <div className="flex items-center mt-2">
                <div className="bg-gray-100 rounded-lg p-3 mr-3">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <p className="font-medium capitalize">{order.payment_method}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center mb-4">
            <div
              className={`w-3 h-3 rounded-full mr-3 ${statusStyle.dot} transition-colors hover:scale-110`}
            ></div>
            <h2 className="text-lg font-semibold">Order Summary</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)} €</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium">{formatPrice(shipping)} €</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-lg text-gray-900">
                {formatPrice(total)} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
