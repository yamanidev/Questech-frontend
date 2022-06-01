import React from "react";
import StudentsTable from "../../../../components/admin/StudentsTable/StudentsTable";

function StudentsPage() {
	return (
		<div className="container">
			<h1 className="mb-10 text-6xl font-semibold">Students List</h1>
			<div className="h-[600px]">
				<StudentsTable />
			</div>
		</div>
	);
}

export default StudentsPage;
