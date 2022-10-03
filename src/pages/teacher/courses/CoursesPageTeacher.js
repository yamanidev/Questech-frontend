import React, { useEffect, useState } from "react";
import LoadingSpinner from "components/LoadingSpinner";
import CoursesList from "components/teacher/CoursesList/CoursesList";
import teacherServices from "services/teacher/teacher-services";
import userService from "services/user/user-service";

function CoursesPageTeacher() {
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses();
  }, []);

  function getCourses() {
    teacherServices
      .getTeacherCourses(userService.getUser().id)
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container relative">
      <h1 className="mb-10 text-6xl font-semibold">Courses</h1>
      {loading ? <LoadingSpinner /> : <CoursesList courses={courses} />}
    </div>
  );
}

export default CoursesPageTeacher;
