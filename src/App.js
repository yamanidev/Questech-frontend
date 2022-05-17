import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import StudentsPage from "./pages/admin/users/students/StudentsPage";
import TeachersPage from "./pages/admin/users/teachers/TeachersPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import NoMatchPage from "./pages/noMatch/NoMatchPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingsPage from "./pages/settings/SettingsPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route
				element={
					<RequireAuth>
						<Layout />
					</RequireAuth>
				}>
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/teachers" element={<TeachersPage />}></Route>
				<Route path="/students" element={<StudentsPage />}></Route>
				<Route path="/settings" element={<SettingsPage />} />
			</Route>
			<Route path="*" element={<NoMatchPage />} />
		</Routes>
	);
}

export default App;
