import React from "react";
import userService from "../../services/user/user-service";

function ProfilePage() {
	const user = userService.getUser();
	return (
		<div className="container">
			<div className="flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left">
				<div className="border border-primary-blue rounded-full w-36 h-36"></div>
				<div>
					<h1 className="text-4xl font-black">{`${user.firstname} ${user.familyname}`}</h1>
					<p className="text-[#959191]">{user.role}</p>
					<p className="text-[#959191]">{user.email}</p>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
