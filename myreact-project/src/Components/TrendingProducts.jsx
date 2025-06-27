import React, { useEffect, useState } from "react";
import { getTrendingProducts } from "../api/ProductApi";
import { API } from "../constants";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiStar, FiTrendingUp } from "react-icons/fi";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingProducts()
      .then((data) => {
        if (data && !data.error) {
          setProducts(data);
        } else {
          console.error("Error fetching trending products:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching trending products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-white/50"
        >
          <div className="w-full h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-2/3"></div>
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse w-24"></div>
              <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  console.log(products);
  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden py-16 px-6">
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 font-semibold mb-6 shadow-sm border border-orange-200/50">
            <FiTrendingUp className="w-5 h-5 mr-2" />
            <span>Hot & Trending</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4 leading-tight">
            Trending Products
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover the most popular products that everyone is talking about
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-1xl overflow-hidden border border-white/50"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Trending Badge */}
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  🔥 #{index + 1}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-white/50 text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-300 transform hover:scale-110">
                  <FiHeart className="w-4 h-4" />
                </button>

                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img
                    src={`${API}/${product.image}`}
                    alt={product.title}
                    className="w-full h-58 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <Link
                      to={`/product/${product._id}`}
                      className="px-4 py-3 bg-white text-gray-800 rounded-full font-semibold transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-100"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Product Title */}
                  <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
                    {product.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className=" font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Rs. {product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {(product.price * 1.15).toFixed(2)}
                    </span>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                      15% OFF
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-2xl font-semibold text-center hover:shadow-lg transform  group/btn"
                    >
                      <span className="flex items-center justify-center">
                        View Details
                        <svg
                          className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Link>

                    <button className="bg-white/80 border-2 border-indigo-200 text-indigo-600 p-3 rounded-2xl hover:scale-100 hover:bg-indigo-50 hover:border-indigo-300 transform transition-all duration-300 shadow-sm hover:shadow-md group/cart">
                      <FiShoppingCart className="w-5 h-5 " />
                    </button>
                  </div>
                </div>

                {/* Hover Gradient Border */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && products.length > 0 && (
          <div className="text-center mt-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                View All Trending Products
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default TrendingProducts;
