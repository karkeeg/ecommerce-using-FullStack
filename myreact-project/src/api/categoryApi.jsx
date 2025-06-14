import { API } from "../constants";

export const getAllCategories = () => {
  return fetch(`${API}/getAllCategories`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const addCategory = (category_name, token) => {
  return fetch(`${API}/addcategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ category_name }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const editCategory = (id, category_name, token) => {
  return fetch(`${API}/updateCategory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ category_name }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getCategoriesDetails = (id) => {
  return fetch(`${API}/getCategoriesDetail/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteCategory = (id, token) => {
  return fetch(`${API}/deleteCategory/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then((res) => res.json());
};
