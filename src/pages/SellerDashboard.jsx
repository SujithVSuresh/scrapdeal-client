import {
  Upload,
  Trash2,
  Edit,
  HardHat,
  Cpu,
  Battery,
  Cable,
  Car,
  Scissors,
  Eye,
  Plus,
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";
import AuthContext from "../context/Auth/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext);
  const [listings, setListings] = useState([]);

  console.log(listings, "this is the listingggg.....");

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await axios.get(
          "/product/my-products"
        );
        setListings(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
        toast.error("Failed to load products");
      }
    };

    fetchMyProducts();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantity: "",
    price: "",
    minOrderQty: "",
    description: "",
    image: null,
  });

  const scrapTypes = [
    { value: "metal", label: "Metal", icon: <HardHat className="w-5 h-5" /> },
    {
      value: "electronics",
      label: "Electronics",
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      value: "batteries",
      label: "Batteries",
      icon: <Battery className="w-5 h-5" />,
    },
    { value: "wires", label: "Wires", icon: <Cable className="w-5 h-5" /> },
    {
      value: "automotive",
      label: "Automotive",
      icon: <Car className="w-5 h-5" />,
    },
    { value: "other", label: "Other", icon: <Scissors className="w-5 h-5" /> },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const response = await axios.post(
        "/product/list",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Item added successfully.");
      setFormData({
        name: "",
        type: "",
        quantity: "",
        price: "",
        minOrderQty: "",
        description: "",
        image: null,
      });
      setListings((prev) => [response.data.product, ...prev]);

      console.log("Product listed:", response.data);
    } catch (err) {
      console.error("Failed to list product:", err);
      toast.error(err?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/product/${id}`);
      setListings((prev) => prev.filter((item) => item._id !== id));
      toast.success(response.data.message || "Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error.message);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Seller Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-lg font-medium">
              {listings.length} Active Listings
            </div>
     <button
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Listing Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                List New Scrap
              </h2>
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-300">
                <Plus className="w-5 h-5" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Item Title
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400"
                  placeholder="e.g. Copper Wiring, Aluminum Sheets"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Scrap Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                  required
                >
                  <option value="" className="text-slate-400">
                    Select type
                  </option>
                  {scrapTypes.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                      className="text-white"
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Rate / kg
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Min Order QTY
                  </label>
                  <input
                    type="number"
                    value={formData.minOrderQty}
                    onChange={(e) =>
                      setFormData({ ...formData, minOrderQty: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Upload Photo
                  </label>
                  <label className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700/30 transition-colors">
                    <Upload className="w-5 h-5 mr-2 text-slate-400" />
                    <span className="text-sm text-slate-400">
                      {formData.image ? formData.image.name : "Choose file"}
                    </span>
                    <input
                      type="file"
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.files[0] })
                      }
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400"
                  placeholder="Provide details about condition, purity, etc."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105"
              >
                List Item
              </button>
            </form>
          </div>

          {/* Current Listings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Your Listings
              </h2>
              <div className="text-slate-400 text-sm">
                {listings.filter((l) => l.status === "available").length} Active •{" "}
                {listings.filter((l) => l.status === "sold").length} Sold
              </div>
            </div>

            {listings.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all">
                <p className="text-slate-400">
                  You haven't listed any items yet
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((item) => (
                      <div
                    key={item._id}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-start hover:border-emerald-500/30 transition-all"
                  >
                    <div
                      className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl mr-4 ${item.gradient} bg-gradient-to-r`}
                    >
                      <img
                        src={`http://localhost:3000${item.image}`}
                        alt="img"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-white">{item.name}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            item.status === "active"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-slate-700/50 text-slate-400"
                          }`}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">
                        {item.type} • {item.quantity} kg
                      </p>
                      <p className="text-sm font-medium text-emerald-400 mt-1">
                        ${item.price}/kg
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        onClick={() => handleDelete(item._id)}
                        title="Delete Product"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        onClick={() => navigate(`/seller/${item._id}/orders`)}
                        title="View Orders"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;