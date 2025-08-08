import {
  Search,
  Filter,
  HardHat,
  Cpu,
  Battery,
  Cable,
  ShoppingBag,
  Car,
  Scissors,
  Star,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import AuthContext from "../context/Auth/AuthContext";
import { useContext } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ScrapListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const scrapTypes = [
    { value: "all", label: "All Types", icon: <Filter className="w-5 h-5" /> },
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

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const response = await axios.get(
          "/product/available-products"
        );
        setListings(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchAllListings();
  }, []);

  const filteredListings = listings.filter((item) => {
    const matchesFilter = activeFilter === "all" || item.type === activeFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      <div className="absolute top-6 flex gap-5 right-6 z-50">
        <button
          onClick={() => navigate("/buyer/orders")}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>My Orders</span>
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          {/* <LogOut className="w-4 h-4" /> */}
          Logout
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Premium{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Scrap Listings
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Browse verified scrap materials from trusted sellers across
            Australia
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search listings (e.g. 'copper', 'batteries')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex overflow-x-auto pb-2 -mx-2 scrollbar-hide">
            {scrapTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setActiveFilter(type.value)}
                className={`flex items-center px-4 py-2 mx-2 rounded-full whitespace-nowrap transition-colors ${
                  activeFilter === type.value
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                }`}
              >
                <span className="mr-2">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center">
            <p className="text-slate-400">
              No listings match your search criteria
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-emerald-500/30 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className={`h-3 bg-gradient-to-r ${item.gradient}`}></div>
                <div className="p-5">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-lg bg-slate-700/50 flex items-center justify-center text-3xl mr-4">
                      <img src={`https://scrapdeal.onrender.com${item.image}`} alt="" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center text-sm text-slate-400 mb-2">
                        <span className="capitalize">{item.type}</span>
                        <span className="mx-2">•</span>
                        <span>{item.quantity} kg</span>
                      </div>
                      {/* <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                          />
                        ))}
                        <span className="text-sm text-slate-400 ml-2">{item.rating}</span>
                      </div> */}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-emerald-400 font-bold text-xl">
                        ${item.price}/kg
                      </p>
                      <div className="flex items-center text-sm text-slate-400 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{item.pickupLocation}</span>
                      </div>
                    </div>
                    <a
                      href={`/scrap-details/${item._id}`}
                      className="flex items-center text-emerald-400 hover:text-emerald-300"
                    >
                      <span className="mr-1">View</span>
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="px-5 py-3 bg-slate-800/30 border-t border-slate-700/50 flex justify-between items-center">
                  <span className="text-sm text-slate-400">
                    @{item.seller.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {item.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-l-lg hover:bg-slate-700/50">
              Previous
            </button>
            <button className="px-4 py-2 bg-emerald-600 border border-emerald-600 text-white">
              1
            </button>
            <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50">
              2
            </button>
            <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50">
              3
            </button>
            <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-r-lg hover:bg-slate-700/50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapListingsPage;
