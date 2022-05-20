import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import RequireRole from "./components/RequireRole/RequireRole";
import StudentsPage from "./pages/admin/users/students/StudentsPage";
import AddTeacherPage from "./pages/admin/users/teachers/AddTeacherPage";
import EditTeacherPage from "./pages/admin/users/teachers/EditTeacherPage";
import TeachersPage from "./pages/admin/users/teachers/TeachersPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
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
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				{/* Routes for the Administrator */}
				<Route element={<RequireRole role="ADMIN" />}>
					<Route path="/teachers" element={<TeachersPage />} />
					<Route path="/teacher/:teacherId/edit" element={<EditTeacherPage />} />
					<Route path="/teacher/new" element={<AddTeacherPage />} />
					<Route path="/students" element={<StudentsPage />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Route>
				{/* Routes for the Professor */}
				<Route element={<RequireRole role="PROFESSOR" />}></Route>
				{/* Routes for the Student */}
				<Route element={<RequireRole role="STUDENT" />}></Route>
			</Route>
			<Route path="*" element={<NoMatchPage />} />
		</Routes>
	);
}

export default App;
