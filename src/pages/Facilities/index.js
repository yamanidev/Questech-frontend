import React from "react";
import Unauthorized from "pages/Unauthorized";
import userService from "services/user/user-service";
import FacilitiesPageAdmin from "pages/admin/Facilities";
import FacilitiesPageTeacher from "pages/teacher/Facilities";

function FacilitiesPage() {
  const currentUserRole = userService.getUser().role;

  if (currentUserRole === "ADMIN") {
    return <FacilitiesPageAdmin />;
  } else if (currentUserRole === "PROFESSOR") {
    return <FacilitiesPageTeacher />;
  }
  return <Unauthorized />;
}

export default FacilitiesPage;
