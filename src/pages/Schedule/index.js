import React from "react";
import userService from "services/user/user-service";
import Unauthorized from "pages/Unauthorized";
import SchedulePageAdmin from "pages/admin/Schedule";
import SchedulePageStudent from "pages/student/Schedule";
import SchedulePageTeacher from "pages/teacher/Schedule";

function SchedulePage() {
  const currentUserRole = userService.getUser().role;

  if (currentUserRole === "ADMIN") {
    return <SchedulePageAdmin />;
  } else if (currentUserRole === "PROFESSOR") {
    return <SchedulePageTeacher />;
  } else if (currentUserRole === "STUDENT") {
    return <SchedulePageStudent />;
  }
  return <Unauthorized />;
}

export default SchedulePage;
