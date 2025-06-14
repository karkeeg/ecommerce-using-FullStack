import React, { useContext } from "react";
import { userContext } from "../../App";

const UserRoutes = () => {
  let user = useContext(userContext);

  return user && user.role == 0 ? <Outlet /> : <Navigate to={"/login"} />;
};

export default UserRoutes;

