import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinner";
import FilesList from "components/teacher/FilesList";
import teacherServices from "services/teacher/teacher-services";

function CoursePageTeacher() {
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
    teacherServices
      .getCourse(codeName)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getFiles() {
    teacherServices
      .getCourseFiles(codeName, "COURSE")
      .then((response) => {
        setLessonFiles(response.data);
        teacherServices
          .getCourseFiles(codeName, "TD")
          .then((response) => {
            setTDFiles(response.data);
            teacherServices
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

  function onConfirmDelete(fileId, type) {
    teacherServices
      .deleteFile(fileId, type, codeName)
      .then((response) => {
        getFiles();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container relative">
      <div className="">
        <div className="mb-5 flex justify-between">
          <h1 className="text-6xl font-semibold">{course.detailedName}</h1>
          <Button variant="contained" color="secondary" component={Link} to="/teacher/courses">
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
      <div className="mt-10 flex justify-end">
        <Button variant="contained" component={Link} to={`/teacher/course/${codeName}/new`}>
          Add new file
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-20">
          <FilesList title="Lessons" files={lessonFiles} onConfirmDelete={onConfirmDelete} />
          <FilesList title="TD" files={TDFiles} onConfirmDelete={onConfirmDelete} />
          <FilesList title="TP" files={TPFiles} onConfirmDelete={onConfirmDelete} />
        </div>
      )}
    </div>
  );
}

export default CoursePageTeacher;
