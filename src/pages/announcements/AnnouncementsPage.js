import React from "react";
import userService from "../../services/user/user-service";
import AnnouncementsPageAdmin from "../admin/announcements/AnnouncementsPageAdmin";
import AnnouncementsPageStudent from "../student/announcements/AnnouncementsPageStudent";
import AnnouncementsPageTeacher from "../teacher/announcements/AnnouncementsPageTeacher";
import Unauthorized from "../Unauthorized/Unauthorized";

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
