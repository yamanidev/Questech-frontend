import React from "react";
import userService from "services/user/user-service";
import AnnouncementsPageAdmin from "pages/admin/announcements/AnnouncementsPageAdmin";
import AnnouncementsPageStudent from "pages/student/announcements/AnnouncementsPageStudent";
import AnnouncementsPageTeacher from "pages/teacher/announcements/AnnouncementsPageTeacher";
import Unauthorized from "pages/Unauthorized/Unauthorized";

function AnnouncementsPage() {
  const currentUserRole = userService.getUser().role;

  if (currentUserRole === "ADMIN") {
    return <AnnouncementsPageAdmin />;
  } else if (currentUserRole === "PROFESSOR") {
    return <AnnouncementsPageTeacher />;
  } else if (currentUserRole === "STUDENT") {
    return <AnnouncementsPageStudent />;
  }
  return <Unauthorized />;
}

export default AnnouncementsPage;
