import { XCircle, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await axios.get(
          "/order/buyer/orders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
        toast.error("Failed to load orders");
      }
    };

    fetchMyOrders();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.put(`/order/cancel/${id}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "cancelled" } : order
        )
      );
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel order:", error.message);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-white">My Orders</h1>
          </div>
          <div className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-lg font-medium">
            {orders.length} Total Orders
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Your Orders</h2>
            <div className="text-slate-400 text-sm">
              {orders.filter((o) => o.status === "pending").length} Pending •{" "}
              {orders.filter((o) => o.status === "completed").length} Completed
              • {orders.filter((o) => o.status === "cancelled").length}{" "}
              Cancelled
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all">
              <p className="text-slate-400">
                You haven't placed any orders yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-start hover:border-emerald-500/30 transition-all"
                >
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl mr-4 bg-gradient-to-r from-emerald-500 to-emerald-600">
                    <img
                      src={`http://localhost:3000${order.product.image}`}
                      alt={order.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-white">
                        {order.product.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : order.status === "Active"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : order.status === "Completed"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      {order.product.type} • {order.quantity} kg • Ordered on{" "}
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-medium text-emerald-400 mt-1">
                      Total: ${order.totalAmount}
                    </p>
                  </div>
                  {(order.status === "pending") && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white py-1.5 px-3 rounded-md text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 flex items-center space-x-1"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>

                   )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
