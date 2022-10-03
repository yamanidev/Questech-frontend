import React from "react";

const lectureBgColor = "bg-violet-200";
const tdBgcolor = "bg-indigo-200";
const tpBgColor = "bg-sky-200";

function ScheduleTimeSlot(props) {
  const { session } = props;

  if (Object.keys(session).length === 0)
    return <div className="h-[150px] border border-gray-300"></div>;

  return (
    <div
      className={`h-[150px] pt-5 ${
        session.type === "COURS" ? lectureBgColor : session.type === "TD" ? tdBgcolor : tpBgColor
      } border border-gray-300`}>
      {session.module.detailedName.length <= 16 ? (
        <h2 className="text-lg">
          {session.type} {session.module.detailedName}
        </h2>
      ) : (
        <h2 className="text-lg">
          {session.type} {session.module.code}
        </h2>
      )}
      {session.professor.academicLevel === "Professor" ? (
        <h2 className="text-lg">Pr. {session.professor.familyname}</h2>
      ) : (
        <h2 className="text-lg">Dr. {session.professor.familyname}</h2>
      )}
      {session.location.type === "Amphi" ? (
        <h2 className="text-lg">Amphitheater {session.location.name}</h2>
      ) : (
        <h2 className="text-lg">{session.location.name}</h2>
      )}
    </div>
  );
}

export default ScheduleTimeSlot;
