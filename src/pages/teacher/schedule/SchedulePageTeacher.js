import React from "react";
import TeacherSchedule from "components/teacher/TeacherSchedule/TeacherSchedule";
import userService from "services/user/user-service";

function SchedulePageTeacher() {
  return (
    <div className="container pb-20">
      <h1 className="mb-10 text-6xl font-semibold">Schedule</h1>
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
      <TeacherSchedule teacherId={userService.getUser().id} />
    </div>
  );
}

export default SchedulePageTeacher;
