import React from "react";
import FacilitiesTable from "~/components/admin/FacilitiesTable";

function FacilitiesPageAdmin() {
  return (
    <div className="container">
      <h1 className="mb-10 text-6xl font-semibold">Facilities</h1>
      <div className="h-[600px] w-full max-w-3xl relative mx-auto">
        <FacilitiesTable />
      </div>
    </div>
  );
}

export default FacilitiesPageAdmin;
