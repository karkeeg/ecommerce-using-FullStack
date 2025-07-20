import { API } from "../constants";

export const getAllOrders = () => {
  return fetch(`${API}/getallorder`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export const getOrderById = (id) => {
  return fetch(`${API}/getsingleorder/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export const getUserOrders = (id, token) => {
  return fetch(`${API}/getorderbyuser/${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateOrderStatus = async (id, status, token) => {
  try {
    const res = await fetch(`${API}/updateorder/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status }),
    });

    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Failed to update status" };
  }
};

export const updateOrder = async (id, token, status) => {
  try {
    const res = await fetch(`${API}/updateorder/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status }),
    });

    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Failed to update status" };
  }
};

export const deleteOrder = async (id, token) => {
  try {
    const res = await fetch(`${API}/deleteOrder/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete order" };
  }
};
export const addneworder = async (newOrder, token) => {
  try {
    const res = await fetch(`${API}/addorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newOrder),
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to add new order!" };
  }
};

export const placeOrder = (order, token) => {
  return fetch(`${API}/placeorder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
