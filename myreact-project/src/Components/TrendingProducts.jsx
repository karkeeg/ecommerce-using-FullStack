import React from "react";

const products = [
  {
    id: 1,
    title: "Product One",
    price: "$49",
    image:
      "https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Product Two",
    price: "$69",
    image:
      "https://images.unsplash.com/photo-1643903032976-8c0d0556a8ea?q=80&w=1471&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Product Three",
    price: "$99",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1396&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Product Four",
    price: "$39",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1412&auto=format&fit=crop",
  },
];

const TrendingProducts = () => {
  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">
          Trending Products
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-700">
                {product.title}
              </h3>
              <p className="text-indigo-600 font-medium">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
