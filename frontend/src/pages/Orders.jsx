import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceTemplate from "../Components/Invoice/InvoiceTemplate";
import { toast } from "react-toastify";

const InvoiceButton = ({ order }) => {
  return (
    <PDFDownloadLink
      document={<InvoiceTemplate order={order} />}
      fileName={`invoice_${order.order_number}.pdf`}
      className="inline-block"
    >
      {({ loading }) => (
        <button
          className={`w-full sm:w-auto text-indigo-600 hover:text-indigo-900 px-3 py-1.5 rounded-md border border-indigo-200 hover:bg-indigo-50 transition-colors text-sm font-medium ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Invoice"}
        </button>
      )}
    </PDFDownloadLink>
  );
};

const Orders = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const statusConfig = {
    "Order Placed": {
      color: "bg-yellow-500",
      text: "Ordered",
      fullText: "Order Placed",
    },
    "Order Sent": {
      color: "bg-orange-500",
      text: "Sent",
      fullText: "Order Sent",
    },
    "Order Delivered": {
      color: "bg-green-500",
      text: "Delivered",
      fullText: "Order Delivered",
    },
    "Order Canceled": {
      color: "bg-red-500",
      text: "Canceled",
      fullText: "Order Canceled",
    },
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewOrderDetails = (orderNumber) => {
    navigate(`/orders/${orderNumber}`);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 max-w-7xl mx-auto">
      <div className="text-2xl mb-8 text-center">
        <Title text1={"MY"} text2={" ORDERS"} />
      </div>

      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center">No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 hidden sm:table-header-group">
              <tr className="grid grid-cols-4 w-full">
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Number
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => {
                const status = statusConfig[order.status] || {
                  color: "bg-gray-500",
                  text: order.status,
                  fullText: order.status,
                };

                return (
                  <tr
                    key={order.order_number}
                    className="grid grid-cols-1 sm:grid-cols-4 w-full"
                  >
                    <td className="px-4 py-3 text-center sm:text-center border-b sm:border-b-0">
                      <div className="sm:hidden text-xs text-gray-500 mb-1">
                        Order #
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.order_number}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center sm:text-center border-b sm:border-b-0">
                      <div className="sm:hidden text-xs text-gray-500 mb-1">
                        Date
                      </div>
                      <div className="text-sm text-gray-500">
                        {" "}
                        {formatDate(order.created_at)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center border-b sm:border-b-0">
                      <div className="sm:hidden text-xs text-gray-500 mb-1">
                        Status
                      </div>
                      <div className="flex items-center justify-center">
                        <span
                          className={`flex-shrink-0 h-3 w-3 rounded-full ${status.color}`}
                        ></span>
                        <span className="ml-2 text-xs sm:text-sm text-gray-900">
                          <span className="sm:hidden">{status.text}</span>
                          <span className="hidden sm:inline">
                            {status.fullText}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="sm:hidden text-xs text-gray-500 mb-2">
                        Actions
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                        <InvoiceButton order={order} />
                        <button
                          onClick={() => viewOrderDetails(order.order_number)}
                          className="w-full sm:w-auto text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
