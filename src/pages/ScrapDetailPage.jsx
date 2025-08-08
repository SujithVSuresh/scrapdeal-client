import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Star,
  MessageCircle,
  ShoppingCart,
  Calendar,
  Weight,
  Package,
  ShoppingBag,
  Shield,
  Heart,
  Share2,
  AlertTriangle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axiosInstance";

const otherData = {
  id: "6890c70b1cc5e3fc17910c50",
  title: "High Purity Copper Wire Scrap",
  category: "Metals",
  subCategory: "Copper",
  price: 450,
  priceUnit: "per kg",
  availableQuantity: 2500,
  minQuantity: 100,
  condition: "Excellent",
  description:
    "Premium-grade copper wire scrap from industrial electrical installations. 99.9% pure copper with PVC insulation removed. Material has been thoroughly cleaned and sorted for optimal recycling efficiency. Suitable for smelting and manufacturing applications.",
  location: "Mumbai, Maharashtra",
  image:
    "https://panupongchaiyarat.com/wp-content/uploads/2025/02/copper-wire-scrap-99-95-to-99.jpg",
  seller: {
    id: 101,
    name: "Rajesh Kumar",
    businessName: "Kumar Scrap Trading",
    rating: 4.7,
    totalReviews: 156,
    memberSince: "2022",
    verified: true,
    phone: "+91 98765 43210",
    email: "rajesh@kumarscrap.com",
    location: "Andheri East, Mumbai",
    avatar: "/api/placeholder/100/100",
  },
  specifications: {
    purity: "99.9%",
    wireGauge: "Mixed (12-16 AWG)",
    packaging: "Bundled (50kg bundles)",
    origin: "Industrial electrical",
    moistureContent: "<0.5%",
    contamination: "Negligible",
  },
  delivery: {
    available: true,
    freeDeliveryAbove: 1000,
    estimatedDays: "3-5 business days",
    charges: 50,
  },
  posted: "2h ago",
  gradient: "from-orange-500 to-amber-600",
};

const ScrapDetailPage = () => {
  const [scrapItem, setScrapItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsById = async () => {
      try {
        const response = await axios.get(
          `/product/products/${id}`
        );
        setScrapItem(response.data.product);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProductsById();
  }, []);

  useEffect(() => {
      if (
          scrapItem?.quantity < scrapItem?.minOrderQty
        ) {
          setQuantity(scrapItem?.quantity);
        }else{
          setQuantity(scrapItem?.minOrderQty);
        }

  }, [scrapItem])

  // Fallback if no item is found
  if (!scrapItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center">
        <div className="text-white text-lg">Item not found</div>
      </div>
    );
  }

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(
      scrapItem.minOrderQty,
      Math.min(scrapItem.quantity, value)
    );
    setQuantity(newQuantity);
  };

  const handleBack = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  const handlePurchaseClick = async () => {
    const confirmed = window.confirm(
      `Confirm purchase of ${quantity} ${scrapItem.price} of ${
        scrapItem.title
      } for ${currency}${(quantity * scrapItem.price).toLocaleString()}?`
    );

    if (confirmed) {
      try {
        const response = await axios.post(
          "/order/place",
          {
            productId: scrapItem._id,
            quantity,
          }
        );
        console.log(response.data, "this is the purchase order...");
        // setListings(response.data.products);
        // if (
        //   (scrapItem.quantity - response.data.order.quantity) <
        //   scrapItem.minOrderQty
        // ) {
        //   setQuantity(scrapItem.quantity - response.data.order.quantity);
        // }else{
        //   setQuantity(scrapItem.minOrderQty);
        // }
        setScrapItem((prev) => {
          return {
            ...prev,
            quantity: prev.quantity - response.data.order.quantity,
          };
        });
        toast.success("Purchase confirmed!");
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    }
  };

  // Determine currency based on location
  const currency = "$";

  const totalPrice = quantity * scrapItem.price;
  // const deliveryCharge =
  //   scrapItem.delivery.available &&
  //   quantity * scrapItem.price >= scrapItem.delivery.freeDeliveryAbove
  //     ? 0
  //     : scrapItem.delivery.charges;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-slate-300 hover:text-white transition-colors"
              aria-label="Back to listings"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Listings
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorited
                    ? "text-red-400 bg-red-500/20"
                    : "text-slate-300 hover:text-red-400 hover:bg-red-500/10"
                }`}
                aria-label={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Heart
                  className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
                />
              </button>
              <button
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Share listing"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/buyer/orders")}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>My Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Section */}
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all">
              <div
                className={`h-2 bg-gradient-to-r ${scrapItem?.gradient}`}
              ></div>
              <div className="aspect-[4/3] bg-slate-700 flex items-center justify-center">
                <img
                  src={`https://scrapdeal.onrender.com${scrapItem?.image}`}
                  alt={scrapItem.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Item Details */}
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {scrapItem.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-slate-300">
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg font-medium">
                      {scrapItem.type}
                    </span>

                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                      {scrapItem.pickupLocation}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-400">
                    {currency}
                    {scrapItem.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-300">
                    {scrapItem.price}
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
                  <Weight className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-300">Available</div>
                  <div className="font-semibold text-white">
                    {scrapItem.quantity} kg
                  </div>
                </div>
                <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
                  <Package className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-300">Min Order</div>
                  <div className="font-semibold text-white">
                    {scrapItem.minOrderQty} kg
                  </div>
                </div>
                <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
                  <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-300">Condition</div>
                  <div className="font-semibold text-white">Good</div>
                </div>
                <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
                  <Calendar className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-300">Posted</div>
                  <div className="font-semibold text-white">
                    {new Date(scrapItem.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Description
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {scrapItem.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(otherData.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-slate-700"
                      >
                        <span className="text-slate-300 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="font-medium text-white">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Delivery Info */}
              {/* {scrapItem.delivery.available && (
                <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-800/50">
                  <div className="flex items-center mb-2">
                    <Truck className="w-5 h-5 text-emerald-400 mr-2" />
                    <h4 className="font-semibold text-emerald-300">Delivery Information</h4>
                  </div>
                  <div className="text-sm text-emerald-200 space-y-1">
                    <div>Delivery available in {scrapItem.delivery.estimatedDays}</div>
                    <div>
                      Free delivery on orders above {currency}
                      {scrapItem.delivery.freeDeliveryAbove}
                    </div>
                    <div>
                      Standard delivery charges: {currency}
                      {scrapItem.delivery.charges}
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>

          {/* Right Column - Seller Info and Purchase */}
          <div className="space-y-6">
            {/* Seller Information */}
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all">
              <h3 className="text-lg font-semibold text-white mb-4">
                Seller Information
              </h3>
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-xl font-bold">
                  {scrapItem.seller.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h4 className="font-semibold text-white">
                      {scrapItem.seller.name}
                    </h4>
                    {/* {scrapItem.seller.verified && ( */}
                    <Shield
                      className="w-4 h-4 text-emerald-400 ml-2"
                      aria-label="Verified seller"
                    />
                    {/* )} */}
                  </div>
                  <p className="text-slate-300 text-sm mb-2">
                    {scrapItem.seller.businessName}
                  </p>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(4.5)
                              ? "text-yellow-400 fill-current"
                              : "text-slate-600"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-300 ml-2">
                      4.5 (7 reviews)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Member since Aug 2, 2025
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-slate-300">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                  {scrapItem.pickupLocation}
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <Phone className="w-4 h-4 mr-2 text-slate-400" />
                  {scrapItem.sellerProfile.phone}
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <Mail className="w-4 h-4 mr-2 text-slate-400" />
                  {scrapItem.seller.email}
                </div>
              </div>
              <button
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center border border-slate-600"
                aria-label="View seller profile"
              >
                View Profile
              </button>
            </div>

            {/* Purchase/Inquiry Section */}
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all">
              <h3 className="text-lg font-semibold text-white mb-4">
                Purchase Details
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {/* Quantity ({scrapItem.priceUnit.replace('per ', '')})
                   */}
                  Quantity {scrapItem.quantity}
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      quantity <= scrapItem.minOrderQty
                        ? "bg-slate-700 text-slate-600 cursor-not-allowed"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    }`}
                    disabled={quantity <= scrapItem.minOrderQty}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        parseInt(e.target.value) || scrapItem.minOrderQty
                      )
                    }
                    min={scrapItem.minQuantity}
                    max={scrapItem.quantity}
                    className="flex-1 text-center py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      quantity >= scrapItem.quantity
                        ? "bg-slate-700 text-slate-600 cursor-not-allowed"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    }`}
                    disabled={quantity >= scrapItem.quantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Min: {scrapItem.minOrderQty} x {scrapItem.price} | Max:{" "}
                  {scrapItem.quantity} x {scrapItem.price}
                </p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>
                      Price ({quantity} × {currency}
                      {scrapItem.price})
                    </span>
                    <span>
                      {currency}
                      {totalPrice.toLocaleString()}
                    </span>
                  </div>
                  {/* {scrapItem.delivery.available && (
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>Delivery Charges</span>
                      <span className={deliveryCharge === 0 ? 'text-emerald-400' : ''}>
                        {deliveryCharge === 0 ? 'FREE' : `${currency}${deliveryCharge}`}
                      </span>
                    </div>
                  )} */}
                  <div className="border-t border-slate-700 pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-slate-300">Total</span>
                      <span className="text-emerald-400">
                        {currency}
                        {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  disabled={scrapItem.quantity == 0 ? true : false}
                  onClick={handlePurchaseClick}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
                  aria-label="Purchase now"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Purchase Now
                </button>

                <a
                  href={`https://wa.me/${scrapItem.sellerProfile.phone}`}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
                  aria-label="Send inquiry"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Inquiry
                </a>
              </div>
              <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-800 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-xs text-yellow-200">
                    <strong>Important:</strong> Always verify material quality
                    before large purchases. Request samples for bulk orders.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapDetailPage;
