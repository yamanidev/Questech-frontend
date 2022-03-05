import React from "react";
import "./LoginForm.css";

function LoginForm() {
	return (
		<div className="w-[680px] mx-auto mt-20 px-28 py-10 rounded-xl bg-white">
			<h2 className="text-4xl text-center text-[#555555]">Sign in</h2>
			<form className="mt-11">
				<div>
					<div className="form-group">
						<div className="mb-2">
							<label htmlFor="username" className="text-[#555555]">
								Username
							</label>
						</div>
						<div className="">
							<input type="text" id="username" className="form-input" />
						</div>
					</div>
					<div className="form-group">
						<div className="mb-2">
							<label htmlFor="password" className="text-[#555555]">
								Password
							</label>
							<a
								href="#"
								className="ml-2 text-sm text-[#999999] hover:text-[#555555] underline">
								Forgot?
							</a>
						</div>
						<div className="">
							<input type="password" id="password" className="form-input" />
						</div>
					</div>
					<button className="w-full py-4 text-white rounded-lg bg-[#333333]">
						Sign in
					</button>
				</div>
				<div className="mt-10 text-center text-sm text-[#999999]">
					<span>Not a member?</span>
					<a href="#" className="ml-1 hover:text-[#555555] underline">
						Sign up now
					</a>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
