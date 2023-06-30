import React from "react";
import userService from "~/services/user/user-service";
import Unauthorized from "~/pages/Unauthorized";
import DashboardPageAdmin from "~/pages/admin/Dashboard";
import DashboardPageStudent from "~/pages/student/Dashboard";
import DashboardPageTeacher from "~/pages/teacher/Dashboard";

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
