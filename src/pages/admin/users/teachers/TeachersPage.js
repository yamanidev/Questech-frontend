import React from "react";
import TeachersTable from "components/admin/TeachersTable/TeachersTable";

function TeachersPage() {
  return (
    <div className="container">
      <h1 className="mb-10 text-6xl font-semibold">Teachers List</h1>
      <div className="h-[600px] relative">
        <TeachersTable />
      </div>
    </div>
  );
}

export default TeachersPage;
