import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "~/components/Layout";
import RequireAuth from "~/components/RequireAuth";
import RequireRole from "~/components/RequireRole";
import GroupsPage from "./pages/admin/Groups";
import AddStudentPage from "./pages/admin/Students/AddStudentPage";
import EditStudentPage from "./pages/admin/Students/EditStudentPage";
import StudentsPage from "./pages/admin/Students";
import AddTeacherPage from "./pages/admin/Teachers/AddTeacherPage";
import EditTeacherPage from "./pages/admin/Teachers/EditTeacherPage";
import TeachersPage from "./pages/admin/Teachers";
import AnnouncementsPage from "./pages/Announcements";
import CoursesPage from "./pages/Courses";
import DashboardPage from "./pages/Dashboard";
import FacilitiesPage from "./pages/Facilities";
import AddFacilitiesPage from "./pages/admin/Facilities/AddFacilityPage";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NoMatchPage from "./pages/NoMatch";
import ProfilePage from "./pages/Profile";
import SchedulePage from "./pages/Schedule";
import SettingsPage from "./pages/Settings";
import GroupPage from "./pages/admin/Group";
import LevelsPage from "./pages/admin/Levels";
import AddGroupStudentsPage from "./pages/admin/AddGroupStudents";
import AddCoursePage from "./pages/admin/Courses/AddCoursePage";
import EditCoursePage from "./pages/admin/Courses/EditCoursePage";
import CoursePageTeacher from "./pages/teacher/Courses/CoursePageTeacher";
import AddFilePage from "./pages/teacher/Courses/AddFilePage";
import CoursePageStudent from "./pages/student/Courses/CoursePageStudent";

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
          <Route path="/admin/:level/group/:groupId/add" element={<AddGroupStudentsPage />} />
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
