import React from "react";
import userService from "services/user/user-service";
import StudentSchedule from "components/student/StudentSchedule";

function SchedulePageStudent() {
  return (
    <div className="container">
      <h1 className="mb-10 text-6xl font-semibold">Schedule student</h1>
      <div className="mb-5 flex justify-end gap-8">
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 mr-2 rounded-full bg-violet-200"></div>
          <span>Cours</span>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 mr-2 rounded-full bg-indigo-200"></div>
          <span>TD</span>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 mr-2 rounded-full bg-sky-200"></div>
          <span>TP</span>
        </div>
      </div>
      <StudentSchedule
        level={userService.getUser().group.groupId.promo}
        groupId={userService.getUser().group.groupId.id}
      />
    </div>
  );
}

export default SchedulePageStudent;
