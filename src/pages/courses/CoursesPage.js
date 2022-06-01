import React from "react";
import userService from "../../services/user/user-service";
import CoursesPageAdmin from "../admin/courses/CoursesPageAdmin";
import CoursesPageStudent from "../student/courses/CoursesPageStudent";
import CoursesPageTeacher from "../teacher/courses/CoursesPageTeacher";
import Unauthorized from "../Unauthorized/Unauthorized";

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
