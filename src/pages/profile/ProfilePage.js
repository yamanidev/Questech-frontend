import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import svg from "../../assets/notification-bell.svg";
import authService from "../../services/auth/auth-service";
import { MdLogout } from "react-icons/md";

function ProfilePage() {
	const navigate = useNavigate();
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isUsersOpen, setIsUsersOpen] = useState(false);

	const logOutHandler = () => {
		authService.logout();
		navigate("/");
	};

	return (
		<>
			<header className="border border-[#707070]">
				<div className="container">
					<nav className="py-3 flex items-center justify-between">
						<div className="relative flex items-center justify-between">
							<Link to="/" className="mr-11 text-xl font-black text-primary-blue">
								Logo
							</Link>
							<button
								onClick={() => {
									setIsUsersOpen(!isUsersOpen);
								}}>
								Users
							</button>
							{isUsersOpen && (
								<div className="absolute top-[1.9rem] -right-[4.5rem] bg-white border rounded-sm">
									<Link to="/students" className="py-3 px-4 block hover:bg-gray-100">
										Students
									</Link>
									<Link to="/professors" className="py-3 px-4 block hover:bg-gray-100">
										Professors
									</Link>
								</div>
							)}
						</div>
						<div className="w-28 flex items-center justify-between relative">
							<img src={svg} alt="logo image" className="h-6 cursor-pointer" />
							<button
								className="w-14 h-14 border border-primary-blue rounded-full cursor-pointer"
								onClick={() => {
									setIsProfileOpen(!isProfileOpen);
								}}></button>
							{isProfileOpen && (
								<div className="w-max absolute top-[4.2rem] right-0 bg-white border rounded-sm">
									<button
										className="py-3 px-4 flex items-center hover:bg-gray-100"
										onClick={logOutHandler}>
										Log out <MdLogout className="ml-1" />
									</button>
								</div>
							)}
						</div>
					</nav>
				</div>
			</header>
			<main>
				<section className="pt-16">
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
				</section>
			</main>
		</>
	);
}

export default ProfilePage;
