import React, { useContext } from "react";
import { userContext } from "../../App";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../api/userApi";

const AdminRoutes = () => {
  let { user } = isAuthenticated();

  return user?.role == 1 ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AdminRoutes;
