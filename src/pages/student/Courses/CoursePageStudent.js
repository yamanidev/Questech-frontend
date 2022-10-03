import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import studentServices from "services/student/student-services";
import LoadingSpinner from "components/LoadingSpinner";
import FilesListStudent from "components/student/FilesList";

function CoursePageStudent() {
  const [lessonFiles, setLessonFiles] = useState({});
  const [TDFiles, setTDFiles] = useState({});
  const [TPFiles, setTPFiles] = useState({});
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);

  const { codeName } = useParams();

  useEffect(() => {
    getCurrentCourse();
    getFiles();
  }, []);

  function getCurrentCourse() {
    studentServices
      .getCourse(codeName)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getFiles() {
    studentServices
      .getCourseFiles(codeName, "COURSE")
      .then((response) => {
        setLessonFiles(response.data);
        studentServices
          .getCourseFiles(codeName, "TD")
          .then((response) => {
            setTDFiles(response.data);
            studentServices
              .getCourseFiles(codeName, "TP")
              .then((response) => {
                setTPFiles(response.data);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container relative">
      <div className="mb-10">
        <div className="mb-5 flex justify-between">
          <h1 className="text-6xl font-semibold">{course.detailedName}</h1>
          <Button variant="contained" color="secondary" component={Link} to="/student/courses">
            Go back
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-semibold">{course.code}</h2>
          <h2 className="text-3xl font-semibold">{course.promo}</h2>
          <p className="text-2xl">Semester {course.semester}</p>
          <p className="text-2xl">Coefficient: {course.coefficient}</p>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-20">
          <FilesListStudent title="Lessons" files={lessonFiles} />
          <FilesListStudent title="TD" files={TDFiles} />
          <FilesListStudent title="TP" files={TPFiles} />
        </div>
      )}
    </div>
  );
}

export default CoursePageStudent;
