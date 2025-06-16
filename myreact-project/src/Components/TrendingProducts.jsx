import React, { useEffect, useState } from "react";
import { getTrendingProducts } from "../api/ProductApi";
import { API } from "../constants";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

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

  return (
    <section className="px-6 py-16  text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">
          🔥 Trending Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-slate-700 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src={`${API}/${product.image}`}
                  alt={product.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-indigo-400 font-bold text-lg mb-3">
                    Rs.{product.price}
                  </p>

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/product/${product._id}`}
                      className="text-sm px-3 py-1 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
                    >
                      View Product
                    </Link>
                    <button className="text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full">
                      <FiShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
