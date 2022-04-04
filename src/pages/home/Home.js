import React from "react";
import "./home.css";

function Home() {
	return (
		<>
			<header>
				<div className="container">
					<nav className="py-3">
						<a href="#" className="text-xl font-black text-primary-blue">
							Logo
						</a>
					</nav>
				</div>
			</header>
			<main>
				<section className="py-48 relative z-0 text-white bg-primary-blue">
					<div className="container">
						<h1 className="mb-8 text-4xl font-black">ESI-SBA Elearn</h1>
						<a
							href="#"
							className="py-1 px-5 font-bold text-primary-blue bg-white rounded-3xl">
							Login
						</a>
					</div>
				</section>
				<section className="relative -top-32 z-10 py-10 text-2xl text-primary-blue font-bold">
					<div className="container flex flex-wrap justify-evenly gap-10">
						<div className="py-20 px-12 bg-white box-shadow">ESI SBA</div>
						<div className="py-20 px-12 bg-white box-shadow">ESI Lib</div>
						<div className="py-20 px-12 bg-white box-shadow">Dépot</div>
						<div className="py-20 px-12 bg-white box-shadow">Chat</div>
					</div>
				</section>
				<section className="mb-36">
					<div className="container text-center">
						<h3 className="mb-32 text-2xl font-bold text-primary-blue">
							-- Course categories --
						</h3>
						<div className="max-w-2xl mx-auto flex justify-evenly flex-wrap gap-14 text-primary-blue">
							<div className="py-10 px-8 shadow-xl">
								<h4 className="mb-2 text-3xl font-bold">1CP</h4>
								<a href="#">Read more</a>
							</div>
							<div className="py-10 px-8 shadow-xl">
								<h4 className="mb-2 text-3xl font-bold">2CP</h4>
								<a href="#">Read more</a>
							</div>
							<div className="py-10 px-8 shadow-xl">
								<h4 className="mb-2 text-3xl font-bold">1CS</h4>
								<a href="#">Read more</a>
							</div>
							<div className="py-10 px-8 shadow-xl">
								<h4 className="mb-2 text-3xl font-bold">2CS</h4>
								<a href="#">Read more</a>
							</div>
							<div className="py-10 px-8 shadow-xl">
								<h4 className="mb-2 text-3xl font-bold">3CS</h4>
								<a href="#">Read more</a>
							</div>
						</div>
					</div>
				</section>
				<section className="">
					<div className="container">
						<h5 className="text-2xl text-primary-blue">Stay in touch</h5>
					</div>
				</section>
			</main>
		</>
	);
}

export default Home;
