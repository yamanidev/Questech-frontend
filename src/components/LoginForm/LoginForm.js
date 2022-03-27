import React from "react";
import "./LoginForm.css";

function LoginForm() {
	return (
		<div className="max-w-[680px] w-full mx-auto mt-20 px-10 sm:px-28 py-10 sm:rounded-xl bg-white">
			<h2 className="text-4xl text-center text-[#555555]">Sign in</h2>
			<form className="mt-11">
				<div className="my-3">
					<div className="mb-2">
						<label htmlFor="email">Email</label>
					</div>
					<div>
						<input type="text" id="email" className="form-input" />
					</div>
				</div>
				<div className="my-3">
					<div className="mb-2">
						<label htmlFor="password">Password</label>
						<a
							href="#"
							className="ml-2 text-sm text-[#999999] hover:text-[#555555] underline">
							Forgot?
						</a>
					</div>
					<div>
						<input type="password" id="password" className="form-input" />
					</div>
				</div>
				<div className="mt-10">
					<button className="w-full py-4 text-white rounded-lg bg-[#333333]">
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
