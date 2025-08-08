import { XCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ProductOrders = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [orders, setOrders] = useState([]);
  const [productName, setProductName] = useState("Product");

  useEffect(() => {
    const fetchProductOrders = async () => {
      try {
        const response = await axios.get(
          `/order/product/${productId}`
        );
        console.log(response, "this is the responseeee....555");
        setOrders(response.data.orders || []);
        // Assuming the first order contains product details
        if (response.data.orders && response.data.orders.length > 0) {
          setProductName(response.data.orders[0].product.name);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
        toast.error("Failed to load orders");
      }
    };

    fetchProductOrders();
  }, [productId]);

//   const handleCancel = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/order/${id}/cancel`);
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === id ? { ...order, status: "cancelled" } : order
//         )
//       );
//       toast.success("Order cancelled successfully");
//     } catch (error) {
//       console.error("Failed to cancel order:", error.message);
//       toast.error("Failed to cancel order");
//     }
//   };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`/order/confirm/${id}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "confirmed" } : order
        )
      );
      toast.success("Order confirmed successfully");
    } catch (error) {
      console.error("Failed to confirm order:", error.message);
      toast.error("Failed to confirm order");
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
            <h1 className="text-3xl font-bold text-white">
              Orders for {productName}
            </h1>
          </div>
          <div className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-lg font-medium">
            {orders.length} Total Orders
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Order List</h2>
            <div className="text-slate-400 text-sm">
              {orders.filter((o) => o.status === "pending").length} Pending •{" "}
              {orders.filter((o) => o.status === "confirmed").length} Confirmed •{" "}
              {orders.filter((o) => o.status === "cancelled").length} Cancelled
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all">
              <p className="text-slate-400">
                No orders have been placed for this product yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-start hover:border-emerald-500/30 transition-all"
                >
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl mr-4 bg-gradient-to-r from-emerald-500 to-emerald-600"
                  >
                    <img
                      src={`https://scrapdeal.onrender.com${order.product.image}`}
                      alt={order.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-white">{order.product.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : order.status === "confirmed"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : order.status === "completed"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
                  {(order.status === "pending" || order.status === "confirmed") && (
                    <div className="flex space-x-2 ml-4">
                      {order.status === "pending" && (
             <button
  onClick={() => handleConfirm(order._id)}
  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-1 px-2 rounded-md text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-1"
>
  <CheckCircle className="w-4 h-4" />
  <span>Confirm</span>
</button>

                      )}
                      {/* <button
                        onClick={() => handleCancel(order._id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Cancel Order</span>
                      </button> */}
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

export default ProductOrders;