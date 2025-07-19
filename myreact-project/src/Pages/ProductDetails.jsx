import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductDetails, getRelatedProducts } from "../api/ProductApi";
import { API } from "../constants";
import { useDispatch } from "react-redux";
import { addToCart } from "../Components/redux/CartActions";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // const [showImageModal, setShowImageModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductDetails(id).then((data) => {
      if (!data.error) setProduct(data);
    });

    getRelatedProducts(id).then((data) => {
      if (!data.error) setRelatedProducts(data);
    });
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity));
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto mb-3">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back to Products
        </button>
      </div>

      {/* Product Details Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow grid md:grid-cols-2 gap-4 p-4">
        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={`{product.product_image}`}
            alt={product.product_name}
            onClick={() => setShowImageModal(true)}
            className="rounded-md max-h-72 object-contain w-full cursor-pointer hover:scale-105 transition"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800 mb-1">
              {product.product_name}
            </h1>
            <p className="text-xs text-gray-600 mb-1">
              <span className="font-medium">Category:</span>{" "}
              {product.category?.category_name}
            </p>
            <p className="text-base font-semibold text-indigo-600 mb-1">
              Rs. {product.product_price}
            </p>
            <p className="text-sm text-gray-700 mb-2 line-clamp-3">
              {product.product_description}
            </p>
            <p className="text-xs text-gray-500 mb-3">
              <span className="font-medium">Stock:</span>{" "}
              {product.count_in_stock > 0 ? (
                <span className="text-green-600">
                  {product.count_in_stock} available
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium">Qty:</span>
              <div className="flex border border-gray-300 rounded overflow-hidden text-sm">
                <button
                  onClick={handleDecrease}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  −
                </button>
                <span className="px-3 py-1">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.count_in_stock === 0}
            className={`py-1.5 px-3 text-sm font-medium rounded-md transition ${
              product.count_in_stock > 0
                ? "bg-yellow-500 text-white hover:bg-yellow-400"
                : "bg-yellow-300 text-white cursor-not-allowed"
            }`}
          >
            {product.count_in_stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10 px-3">
          <h2 className="text-lg font-bold text-gray-800 mb-5">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="group bg-white border-1 border-red-200  rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <Link to={`/products/${item._id}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden rounded-md">
                    <img
                      src={`${API}/${item.product_image}`}
                      alt={item.product_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="mt-2 px-1">
                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {item.product_name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Category: {item.category?.category_name}
                    </p>
                    <p className="text-sm text-indigo-600 font-semibold mt-1">
                      Rs. {item.product_price}
                    </p>
                  </div>
                </Link>
                <Link
                  to={`/product/${item._id}`}
                  className="mt-3 text-center text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded-md py-2 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Image Modal */}
      {/* {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowImageModal(false)}
        >
          <img
            src={`${API}/${product.product_image}`}
            alt={product.product_name}
            className="max-h-[90vh]  rounded-lg"
          />
        </div>
      )} */}
    </div>
  );
};

export default ProductDetails;
