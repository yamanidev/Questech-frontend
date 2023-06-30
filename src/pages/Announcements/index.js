import React from "react";
import userService from "~/services/user/user-service";
import AnnouncementsPageAdmin from "~/pages/admin/Announcements";
import AnnouncementsPageStudent from "~/pages/student/Announcements";
import AnnouncementsPageTeacher from "~/pages/teacher/Announcements";
import Unauthorized from "~/pages/Unauthorized";

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
