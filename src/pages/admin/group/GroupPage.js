import React from "react";
import { useParams } from "react-router-dom";
import GroupStudentsTable from "../../../components/admin/GroupStudentsTable/GroupStudentsTable";

function GroupPage() {
  const { groupId, level } = useParams();

  return (
    <div className="container">
      <h1 className="mb-10 text-6xl font-semibold">
        Group {groupId}
        <span className="ml-5 text-2xl">({level})</span>
      </h1>
      <div className="h-[600px]">
        <GroupStudentsTable level={level} groupId={groupId} />
      </div>
    </div>
  );
}

export default GroupPage;
