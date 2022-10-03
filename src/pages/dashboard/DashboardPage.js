import React from "react";
import userService from "../../services/user/user-service";
import Unauthorized from "../Unauthorized/Unauthorized";
import DashboardPageAdmin from "../admin/dashboard/DashboardPageAdmin";
import DashboardPageStudent from "../student/dashboard/DashboardPageStudent";
import DashboardPageTeacher from "../teacher/dashboard/DashboardPageTeacher";

function DashboardPage() {
  const currentUserRole = userService.getUser().role;

  if (currentUserRole === "ADMIN") {
    return <DashboardPageAdmin />;
  } else if (currentUserRole === "PROFESSOR") {
    return <DashboardPageTeacher />;
  } else if (currentUserRole === "STUDENT") {
    return <DashboardPageStudent />;
  }
  return <Unauthorized />;
}

export default DashboardPage;
