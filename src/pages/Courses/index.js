import React from "react";
import userService from "services/user/user-service";
import CoursesPageAdmin from "pages/admin/Courses";
import CoursesPageStudent from "pages/student/Courses";
import CoursesPageTeacher from "pages/teacher/Courses";
import Unauthorized from "pages/Unauthorized";

function CoursesPage() {
  const currentUserRole = userService.getUser().role;

  if (currentUserRole === "ADMIN") {
    return <CoursesPageAdmin />;
  } else if (currentUserRole === "PROFESSOR") {
    return <CoursesPageTeacher />;
  } else if (currentUserRole === "STUDENT") {
    return <CoursesPageStudent />;
  }
  return <Unauthorized />;
}

export default CoursesPage;
