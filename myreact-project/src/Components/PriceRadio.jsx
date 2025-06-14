import React, { useState } from "react";

const PriceRadio = ({ handleFilters }) => {
  const priceOptions = [
    { id: 0, title: "All", value: [] },
    { id: 1, title: "Upto Rs.1000", value: [0, 999] },
    { id: 2, title: "Rs.1000 - Rs.10000", value: [1000, 9999] },
    { id: 3, title: "Rs.10000 - Rs.100000", value: [10000, 99999] },
    { id: 4, title: "Rs.100000 - Rs.1000000", value: [100000, 999999] },
  ];

  const [selectedPriceId, setSelectedPriceId] = useState(0);

  const handleChange = (e) => {
    const priceId = parseInt(e.target.value);
    const selectedPrice = priceOptions.find((p) => p.id === priceId);
    setSelectedPriceId(priceId);
    handleFilters(selectedPrice.value, "product_price");
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Price</h3>
      <div className="space-y-2">
        {priceOptions.map((price) => (
          <label key={price.id} className="flex items-center space-x-2">
            <input
              type="radio"
              name="price"
              value={price.id}
              checked={selectedPriceId === price.id}
              onChange={handleChange}
              className="accent-indigo-600"
            />
            <span className="text-gray-700">{price.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PriceRadio;
