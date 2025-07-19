import React, { useEffect, useState } from "react";
import CategoryCheckbox from "../Components/CategoryCheckbox";
import PriceRadio from "../Components/PriceRadio";
import { getfilteredproducts } from "../api/ProductApi";
import { API } from "../constants";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    product_price: [],
  });

  const handleFilters = (filter, filterBy) => {
    setFilters({
      ...filters,
      [filterBy]: filter,
    });
  };

  useEffect(() => {
    getfilteredproducts(filters).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  }, [filters]);

  console.log("Image Address", `${API}/${products.product_image}`);
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Filter Products
          </h2>

          <CategoryCheckbox handleFilters={handleFilters} />
          <PriceRadio handleFilters={handleFilters} />
        </aside>

        {/* Product Grid */}
        <section className="w-full md:w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Products</h2>

          {products.length === 0 ? (
            <p className="text-gray-500 text-lg">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col"
                >
                  <img
                    src={`${API}/${product.product_image}`}
                    alt={product.product_name}
                    className="w-full h-52 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {product.product_name}
                  </h3>
                  <p className="text-lg text-indigo-600 font-bold mb-1">
                    Rs. {product.product_price}
                  </p>
                  <span className="text-sm text-gray-500 mb-3">
                    Category: {product.category?.category_name}
                  </span>
                  <Link
                    to={`/product/${product._id}`}
                    className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded-lg font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
