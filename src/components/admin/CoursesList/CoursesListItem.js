import React from "react";
import placeholder from "../../../assets/courses/course-placeholder.jpg";

function CoursesListItem(props) {
	const { course } = props;
	return (
		<div className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded">
			<img src={placeholder} alt="" className="max-h-[300px]" />
			<div className="py-2 px-5">
				<h3 className="text-2xl font-semibold">{course.code}</h3>
				<h4 className="text-lg">{course.promo}</h4>
				<h5>S{course.semester}</h5>
			</div>
		</div>
	);
}

export default CoursesListItem;
