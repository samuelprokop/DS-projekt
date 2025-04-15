import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const statusConfig = {
    "Order Placed": {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      border: "border-yellow-100",
      dot: "bg-yellow-500",
    },
    "Order Sent": {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-100",
      dot: "bg-orange-500",
    },
    "Order Delivered": {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-100",
      dot: "bg-green-500",
    },
    "Order Canceled": {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-100",
      dot: "bg-red-500",
    },
  };

  const getStatusClasses = (status) => {
    return (
      statusConfig[status] || {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
        dot: "bg-blue-500",
      }
    );
  };

  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error(response.data.message || "Failed to load orders");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Error loading orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderNumber, newStatus) => {
    try {
      await axios.put(
        `${backendUrl}/api/order/status`,
        { orderNumber, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Order status updated to ${newStatus}`);
      fetchAllOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const toggleDropdown = (orderNumber) => {
    setOpenDropdownId(openDropdownId === orderNumber ? null : orderNumber);
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <button
          onClick={fetchAllOrders}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusClasses = getStatusClasses(order.status);
            return (
              <div
                key={order.order_number}
                className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={assets.parcel_icon}
                      alt="Package"
                      className="w-6 h-6 object-contain"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        Order #{order.order_number}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusClasses.bg} ${statusClasses.text} ${statusClasses.border} border`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${statusClasses.dot}`}
                    ></span>
                    {order.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Customer</h4>
                    <p className="text-gray-800">
                      {order.first_name} {order.last_name}
                    </p>
                    <p className="text-gray-600">{order.email}</p>
                    <p className="text-gray-600 mt-1">{order.phone}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Shipping</h4>
                    <p className="text-gray-800">{order.street}</p>
                    <p className="text-gray-800">
                      {order.city}, {order.state} {order.zip_code}
                    </p>
                    <p className="text-gray-800">{order.country}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Order Details
                    </h4>
                    <p className="text-gray-800">
                      Total:{" "}
                      <span className="font-semibold">
                        €{order.total_amount}
                      </span>
                    </p>
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Update Status
                      </label>
                      <div className="relative">
                        <button
                          className="flex items-center justify-between w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-left"
                          onClick={() => toggleDropdown(order.order_number)}
                        >
                          <span>{order.status}</span>
                          <svg
                            className={`w-5 h-5 ml-2 transition-transform ${
                              openDropdownId === order.order_number
                                ? "rotate-180"
                                : ""
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

                        {openDropdownId === order.order_number && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {[
                              "Order Placed",
                              "Order Sent",
                              "Order Delivered",
                              "Order Canceled",
                            ].map((status) => (
                              <button
                                key={status}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                  order.status === status
                                    ? "bg-gray-100 font-medium"
                                    : ""
                                }`}
                                onClick={() => {
                                  updateOrderStatus(order.order_number, status);
                                  setOpenDropdownId(null);
                                }}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3">Items</h4>
                  <div className="space-y-3">
                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100"
                      >
                        <div className="flex items-center gap-4">
                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-12 h-12 object-contain border rounded-md"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.manufacturer}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">
                            {item.quantity} x €{item.price}
                          </p>
                          <p className="font-medium text-gray-800">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
