import React, { useState } from "react";
import { Link } from "react-router-dom";
import svg from "../../assets/notification-bell.svg";

function ProfilePage() {
	const [isProfileOpen, setIsProfileOpen] = useState(false);

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
						<div className="w-28 flex items-center justify-between relative">
							<img src={svg} alt="logo image" className="h-6 cursor-pointer" />
							<button
								className="w-14 h-14 border border-primary-blue rounded-full cursor-pointer"
								onClick={() => {
									setIsProfileOpen(!isProfileOpen);
								}}
								onBlur={() => {
									if (isProfileOpen) setIsProfileOpen(false);
								}}></button>
							{isProfileOpen && (
								<div className="w-max px-2 absolute top-[4.2rem] right-0 bg-gray-100">
									<button className="py-3">Log out</button>
								</div>
							)}
						</div>
					</nav>
				</div>
			</header>
			<main>
				<section className="pt-16">
					<div className="container">
						<div className="flex items-center gap-10">
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
