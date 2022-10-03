import React from "react";
import userService from "services/user/user-service";
import Unauthorized from "pages/Unauthorized/Unauthorized";
import DashboardPageAdmin from "pages/admin/dashboard/DashboardPageAdmin";
import DashboardPageStudent from "pages/student/dashboard/DashboardPageStudent";
import DashboardPageTeacher from "pages/teacher/dashboard/DashboardPageTeacher";

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
