import React from "react";
import { Link } from "react-router-dom";
import svg from "../../assets/notification-bell.svg";

function ProfilePage() {
	return (
		<>
			<header className="border border-[#707070]">
				<div className="container">
					<nav className="py-3 flex items-center justify-between">
						<div className="flex items-center justify-between">
							<Link to="/" className="mr-11 text-xl font-black text-primary-blue">
								Logo
							</Link>
							<Link to="/users">Users</Link>
						</div>
						<div className="w-28 flex items-center justify-between">
							<img src={svg} alt="logo image" className="h-6 cursor-pointer" />
							<div className="cursor-pointer border border-primary-blue rounded-full w-14 h-14"></div>
						</div>
					</nav>
				</div>
			</header>
		</>
	);
}

export default ProfilePage;
