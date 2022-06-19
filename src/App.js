import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import RequireRole from "./components/RequireRole/RequireRole";
import GroupsPage from "./pages/admin/groups/GroupsPage";
import AddStudentPage from "./pages/admin/users/students/AddStudentPage";
import EditStudentPage from "./pages/admin/users/students/EditStudentPage";
import StudentsPage from "./pages/admin/users/students/StudentsPage";
import AddTeacherPage from "./pages/admin/users/teachers/AddTeacherPage";
import EditTeacherPage from "./pages/admin/users/teachers/EditTeacherPage";
import TeachersPage from "./pages/admin/users/teachers/TeachersPage";
import AnnouncementsPage from "./pages/announcements/AnnouncementsPage";
import CoursesPage from "./pages/courses/CoursesPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import FacilitiesPage from "./pages/facilities/FacilitiesPage";
import AddFacilitiesPage from "./pages/admin/facilities/AddFacilityPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import NoMatchPage from "./pages/noMatch/NoMatchPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SchedulePage from "./pages/schedule/SchedulePage";
import SettingsPage from "./pages/settings/SettingsPage";
import GroupPage from "./pages/admin/group/GroupPage";
import LevelsPage from "./pages/admin/levels/LevelsPage";
import AddGroupStudentsPage from "./pages/admin/addGroupStudents/AddGroupStudentsPage";
import AddCoursePage from "./pages/admin/courses/AddCoursePage";
import EditCoursePage from "./pages/admin/courses/EditCoursePage";
import CoursePageTeacher from "./pages/teacher/courses/CoursePageTeacher";
import AddFilePage from "./pages/teacher/courses/AddFilePage";
import CoursePageStudent from "./pages/student/courses/CoursePageStudent";

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
					<Route path="/admin/dashboard" element={<DashboardPage />} />
					<Route path="/admin/teachers" element={<TeachersPage />} />
					<Route path="/admin/teacher/:teacherId/edit" element={<EditTeacherPage />} />
					<Route path="/admin/teacher/new" element={<AddTeacherPage />} />
					<Route path="/admin/students" element={<StudentsPage />} />
					<Route path="/admin/student/new" element={<AddStudentPage />} />
					<Route path="/admin/student/:studentId/edit" element={<EditStudentPage />} />
					<Route path="/admin/courses" element={<CoursesPage />} />
					<Route path="/admin/course/new" element={<AddCoursePage />} />
					<Route path="/admin/course/:courseId/edit" element={<EditCoursePage />} />
					<Route path="/admin/facilities" element={<FacilitiesPage />} />
					<Route path="/admin/facility/new" element={<AddFacilitiesPage />} />
					<Route path="/admin/levels" element={<LevelsPage />} />
					<Route path="/admin/:level/groups" element={<GroupsPage />} />
					<Route path="/admin/:level/group/:groupId" element={<GroupPage />} />
					<Route
						path="/admin/:level/group/:groupId/add"
						element={<AddGroupStudentsPage />}
					/>
					<Route path="/admin/schedule" element={<SchedulePage />} />
					<Route path="/admin/announcements" element={<AnnouncementsPage />} />
				</Route>
				{/* Routes for the Teacher */}
				<Route element={<RequireRole role="PROFESSOR" />}>
					<Route path="/teacher/dashboard" element={<DashboardPage />} />
					<Route path="/teacher/courses" element={<CoursesPage />} />
					<Route path="/teacher/course/:codeName" element={<CoursePageTeacher />} />
					<Route path="/teacher/course/:codeName/new" element={<AddFilePage />} />
					<Route path="/teacher/facilities" element={<FacilitiesPage />} />
					<Route path="/teacher/schedule" element={<SchedulePage />} />
					<Route path="/teacher/announcements" element={<AnnouncementsPage />} />
				</Route>
				{/* Routes for the Student */}
				<Route element={<RequireRole role="STUDENT" />}>
					<Route path="/student/dashboard" element={<DashboardPage />} />
					<Route path="/student/courses" element={<CoursesPage />} />
					<Route path="/student/course/:codeName" element={<CoursePageStudent />} />
					<Route path="/student/schedule" element={<SchedulePage />} />
					<Route path="/student/announcements" element={<AnnouncementsPage />} />
				</Route>
			</Route>
			<Route path="*" element={<NoMatchPage />} />
		</Routes>
	);
}

export default App;
