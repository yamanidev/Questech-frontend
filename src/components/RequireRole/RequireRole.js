import React from "react";
import { Outlet } from "react-router-dom";
import userService from "../../services/user/user-service";
import Unauthorized from "../../pages/Unauthorized/Unauthorized";

function RequireRole(props) {
  const currentUser = userService.getUser();
  if (currentUser.role === props.role) {
    return <Outlet />;
  }
  return <Unauthorized />;
}

export default RequireRole;
