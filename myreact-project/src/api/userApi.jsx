import { API } from "../constants";

export const register = (user) => {
  return fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const login = (user) => {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const verifyEmail = (token) => {
  return fetch(`${API}/verify/${token}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export const forgetPassword = (email) => {
  return fetch(`${API}/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }), // use the email parameter
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const resetPassword = (token, password) => {
  return fetch(`${API}/resetPassword/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const authenticate = (token) => {
  localStorage.setItem("login_token", JSON.stringify(token));
};

export const isAuthenticated = () => {
  return localStorage.getItem("login_token")
    ? JSON.parse(localStorage.getItem("login_token"))
    : false;
};

export const getUser = (token) => {
  return fetch(`${API}/getUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getAllUser = () => {
  return fetch(`${API}/getAllUsers`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const createUser = (user, token) => {
  return fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // assuming token needed
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateUser = (id, user, token) => {
  return fetch(`${API}/updateUser/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export const getUserById = (id, token) => {
  return fetch(`${API}/getUserById/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteUser = (id, token) => {
  return fetch(`${API}/deleteUser/${id}`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const changeRole = (id, newRole, token) => {
  return fetch(`${API}/changerole/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ role: newRole }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const verifyuserbyadmin = (id, token) => {
  return fetch(`${API}/verifyuserbyadmin/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ isVerified: true }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
