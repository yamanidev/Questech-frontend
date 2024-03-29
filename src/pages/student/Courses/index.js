import React, { useEffect, useState } from "react";
import studentServices from "~/services/student/student-services";
import userService from "~/services/user/user-service";
import CoursesList from "~/components/student/CoursesList";
import LoadingSpinner from "~/components/LoadingSpinner";

function CoursesPageStudent() {
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses();
  }, []);

  function getCourses() {
    studentServices
      .getCourses(userService.getUser().group.groupId.promo)
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

export default CoursesPageStudent;
