import React from "react";
import CoursesTable from "components/admin/CoursesTable";

function CoursesPageAdmin() {
  return (
    <div className="container relative">
      <h1 className="mb-10 text-6xl font-semibold">Courses</h1>
      <div className="h-[600px]">
        <CoursesTable />
      </div>
    </div>
  );
}

export default CoursesPageAdmin;
