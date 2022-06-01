import React from "react";
import Unauthorized from "../Unauthorized/Unauthorized";
import userService from "../../services/user/user-service";
import FacilitiesPageAdmin from "../admin/facilities/FacilitiesPageAdmin";
import FacilitiesPageTeacher from "../teacher/facilities/FacilitiesPageTeacher";

function FacilitiesPage() {
	const currentUserRole = userService.getUser().role;

	if (currentUserRole === "ADMIN") {
		return <FacilitiesPageAdmin />;
	} else if (currentUserRole === "PROFESSOR") {
		return <FacilitiesPageTeacher />;
	}
	return <Unauthorized />;
}

export default FacilitiesPage;
