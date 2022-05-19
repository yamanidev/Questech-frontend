import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
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
import userService from "./services/user/user-service";

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
				{/* Routes for ADMIN */}
				{userService.getUser().role === "ADMIN" && (
					<>
						<Route path="/teachers" element={<TeachersPage />}></Route>
						<Route path="/teacher/:teacherId/edit" element={<EditTeacherPage />} />
						<Route path="/teacher/new" element={<AddTeacherPage />} />
						<Route path="/students" element={<StudentsPage />}></Route>
						<Route path="/settings" element={<SettingsPage />} />
					</>
				)}
				{/* Routes for PROFESSOR */}
				{userService.getUser().role === "PROFESSOR" && <></>}
				{/* Routes for STUDENT */}
				{userService.getUser().role === "STUDENT" && <></>}
			</Route>
			<Route path="*" element={<NoMatchPage />} />
		</Routes>
	);
}

export default App;
