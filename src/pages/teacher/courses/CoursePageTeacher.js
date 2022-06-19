import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import teacherServices from "../../../services/teacher/teacher-services";

function CoursePageTeacher() {
	const { codeName } = useParams();
	const [course, setCourse] = useState({});

	useEffect(() => {
		getCurrentCourse();
	}, []);

	function getCurrentCourse() {
		return teacherServices
			.getCourse(codeName)
			.then((response) => {
				setCourse(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div className="container">
			<div className="">
				<h1 className="mb-5 text-6xl font-semibold">{course.detailedName}</h1>
				<h2 className="text-4xl font-semibold">{course.code}</h2>
				<h3 className="text-3xl font-semibold">{course.promo}</h3>
			</div>
			<div className="mt-10 flex justify-end">
				<Button
					variant="contained"
					component={Link}
					to={`/teacher/course/${codeName}/new`}>
					Add new file
				</Button>
			</div>
		</div>
	);
}

export default CoursePageTeacher;
