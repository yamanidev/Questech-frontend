import React from "react";
import CoursesListItem from "./CoursesListItem";

function CoursesList(props) {
	const { courses } = props;
	return (
		<div className="flex flex-wrap gap-10">
			{courses.map((course, index) => (
				<CoursesListItem key={index} course={course} />
			))}
		</div>
	);
}

export default CoursesList;
