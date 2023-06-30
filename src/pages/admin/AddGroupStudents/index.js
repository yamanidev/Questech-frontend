import React from "react";
import { useParams } from "react-router-dom";
import GrouplessStudentsTable from "~/components/admin/GrouplessStudentsTable";

function AddGroupStudentsPage() {
  const { level, groupId } = useParams();

  return (
    <div className="container">
      <h1 className="mb-10 text-6xl font-semibold">
        Add {level} Students to group {groupId}
      </h1>
      <div className="h-[600px]">
        <GrouplessStudentsTable level={level} groupId={groupId} />
      </div>
    </div>
  );
}

export default AddGroupStudentsPage;
