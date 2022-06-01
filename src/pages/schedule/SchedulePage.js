import React from "react";
import userService from "../../services/user/user-service";
import Unauthorized from "../Unauthorized/Unauthorized";
import SchedulePageAdmin from "../admin/schedule/SchedulePageAdmin";
import SchedulePageStudent from "../student/schedule/SchedulePageStudent";
import SchedulePageTeacher from "../teacher/schedule/SchedulePageTeacher";

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
