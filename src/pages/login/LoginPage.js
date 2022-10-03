import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "components/LoginForm";
import authService from "services/auth/auth-service";
import "./loginPage.css";
import login from "assets/login.svg";

function LoginPage() {
  if (authService.isAuthn()) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="container">
      <div className="mt-20 px-10 flex flex-col xl:flex-row items-center justify-center">
        <LoginForm></LoginForm>
        <img src={login} alt="" />
      </div>
    </div>
  );
}

export default LoginPage;
