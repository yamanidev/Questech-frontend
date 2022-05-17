import React from "react";

function ProfilePage() {
	return (
		<div className="container">
			<div className="flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left">
				<div className="border border-primary-blue rounded-full w-36 h-36"></div>
				<div>
					<h1 className="text-4xl font-black">John Doe</h1>
					<p className="text-[#959191]">Administrator</p>
					<p className="text-[#959191]">admin@admin.com</p>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
