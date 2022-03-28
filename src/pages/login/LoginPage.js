import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import authService from "../../services/auth/auth-service";
import "./LoginPage.css";

function LoginPage() {
	if (authService.isAuthn()) {
		return <Navigate to="/profile" />;
	}
	return <LoginForm></LoginForm>;
}

export default LoginPage;
