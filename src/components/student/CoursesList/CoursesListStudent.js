import React from "react";
import CoursesListItemStudent from "./CoursesListItemStudent";

function CoursesListStudent(props) {
	const { courses } = props;

	return (
		<div className="flex flex-wrap gap-10">
			{courses.map((course, index) => (
				<CoursesListItemStudent key={index} course={course} />
			))}
		</div>
	);
}

export default CoursesListStudent;
