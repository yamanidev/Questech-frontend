import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import RequireRole from "./components/RequireRole/RequireRole";
import DashboardPageAdmin from "./pages/admin/dashboard/DashboardPageAdmin";
import DashboardPageTeacher from "./pages/teacher/dashboard/DashboardPageTeacher";
import DashboardPageStudent from "./pages/student/dashboard/DashboardPageStudent";
import StudentsPage from "./pages/admin/users/students/StudentsPage";
import AddTeacherPage from "./pages/admin/users/teachers/AddTeacherPage";
import EditTeacherPage from "./pages/admin/users/teachers/EditTeacherPage";
import TeachersPage from "./pages/admin/users/teachers/TeachersPage";
import CoursesPageAdmin from "./pages/admin/courses/CoursesPageAdmin";
import FacilitiesPageAdmin from "./pages/admin/facilities/FacilitiesPageAdmin";
import GroupsPage from "./pages/admin/groups/GroupsPage";
import SchedulePageAdmin from "./pages/admin/schedule/SchedulePageAdmin";
import AnnouncementsPageAdmin from "./pages/admin/announcements/AnnouncementsPageAdmin";
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
				<Route path="/settings" element={<SettingsPage />} />
				{/* Routes for the Administrator */}
				<Route element={<RequireRole role="ADMIN" />}>
					<Route path="/dashboard" element={<DashboardPageAdmin />} />
					<Route path="/teachers" element={<TeachersPage />} />
					<Route path="/teacher/:teacherId/edit" element={<EditTeacherPage />} />
					<Route path="/teacher/new" element={<AddTeacherPage />} />
					<Route path="/students" element={<StudentsPage />} />
					<Route path="/courses" element={<CoursesPageAdmin />} />
					<Route path="/facilities" element={<FacilitiesPageAdmin />} />
					<Route path="/groups" element={<GroupsPage />} />
					<Route path="/schedule" element={<SchedulePageAdmin />} />
					<Route path="/announcements" element={<AnnouncementsPageAdmin />} />
				</Route>
				{/* Routes for the Teacher */}
				<Route element={<RequireRole role="PROFESSOR" />}>
					<Route path="/dashboard" element={<DashboardPageTeacher />} />
				</Route>
				{/* Routes for the Student */}
				<Route element={<RequireRole role="STUDENT" />}>
					<Route path="/dashboard" element={<DashboardPageStudent />} />
				</Route>
			</Route>
			<Route path="*" element={<NoMatchPage />} />
		</Routes>
	);
}

export default App;
