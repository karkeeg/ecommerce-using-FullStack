import React, { useEffect, useState } from "react";
import { getAllCategories } from "../api/categoryApi";

const CategoryCheckbox = ({ handleFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

  const handleChange = (e) => {
    const categoryId = e.target.value;
    let newSelected = [...selectedCategories];

    const index = newSelected.indexOf(categoryId);
    if (index > -1) {
      newSelected.splice(index, 1); 
    } else {
      newSelected.push(categoryId);
    }

    setSelectedCategories(newSelected);
    handleFilters(newSelected, "category"); 
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Category</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <label key={category._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={category._id}
              checked={selectedCategories.includes(category._id)}
              onChange={handleChange}
              className="accent-indigo-600"
            />
            <span className="text-gray-700">{category.category_name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryCheckbox;
