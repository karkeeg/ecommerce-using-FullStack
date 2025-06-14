import { API } from "../constants";

export const getAllProducts = () => {
  return fetch(`${API}/product`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const addProduct = (formData, token) => {
  return fetch(`${API}/product`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getProductDetails = (id) => {
  return fetch(`${API}/product/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const editProduct = (id, updatedFormData, token) => {
  return fetch(`${API}/product/${id}`, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
    body: updatedFormData,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteProduct = (id, token) => {
  return fetch(`${API}/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then((res) => res.json());
};
export const getfilteredproducts = (filter) => {
  return fetch(`${API}/getFilteredProducts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export const getRelatedProducts = (id) => {
  return fetch(`${API}/getrelatedproducts/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
