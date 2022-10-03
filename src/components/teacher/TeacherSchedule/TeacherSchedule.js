import React, { useEffect, useState } from "react";
import teacherServices from "../../../services/teacher/teacher-services";
import TimeColumn from "../../TimeColumn/TimeColumn";
import TeacherScheduleColumn from "./TeacherScheduleColumn";

function TeacherSchedule(props) {
  const { teacherId } = props;
  const [sundaySchedule, setSundaySchedule] = useState([]);
  const [mondaySchedule, setMondaySchedule] = useState([]);
  const [tuesdaySchedule, setTuesdaySchedule] = useState([]);
  const [wednesdaySchedule, setWednesdaySchedule] = useState([]);
  const [thursdaySchedule, setThursdaySchedule] = useState([]);

  useEffect(() => {
    fetchSchedule();
  }, []);

  function fetchSchedule() {
    fetchDaySchedule("SUNDAY");
    fetchDaySchedule("MONDAY");
    fetchDaySchedule("TUESDAY");
    fetchDaySchedule("WEDNESDAY");
    fetchDaySchedule("THURSDAY");
  }

  function fetchDaySchedule(day) {
    teacherServices
      .getSchedule(day, teacherId)
      .then((response) => {
        const formattedSchedule = formatSchedule(response.data);
        switch (day) {
          case "SUNDAY":
            setSundaySchedule(formattedSchedule);
            break;
          case "MONDAY":
            setMondaySchedule(formattedSchedule);
            break;
          case "TUESDAY":
            setTuesdaySchedule(formattedSchedule);
            break;
          case "WEDNESDAY":
            setWednesdaySchedule(formattedSchedule);
            break;
          case "THURSDAY":
            setThursdaySchedule(formattedSchedule);
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function formatSchedule(schedule) {
    const formatted = [{}, {}, {}, {}, {}];
    if (!schedule) return formatted;
    for (const session of schedule) {
      switch (session.sessionId.time) {
        case "H8h_9h30":
          formatted[0] = session;
          break;
        case "H9h30_11h":
          formatted[1] = session;
          break;
        case "H11h_12h30":
          formatted[2] = session;
          break;
        case "H2h_3h30":
          formatted[3] = session;
          break;
        case "H3h30_5h":
          formatted[4] = session;
          break;
      }
    }
    return formatted;
  }

  return (
    <div className="flex">
      <TimeColumn />
      <TeacherScheduleColumn day="SUNDAY" daySchedule={sundaySchedule} />
      <TeacherScheduleColumn day="MONDAY" daySchedule={mondaySchedule} />
      <TeacherScheduleColumn day="TUESDAY" daySchedule={tuesdaySchedule} />
      <TeacherScheduleColumn day="WEDNESDAY" daySchedule={wednesdaySchedule} />
      <TeacherScheduleColumn day="THURSDAY" daySchedule={thursdaySchedule} />
    </div>
  );
}

export default TeacherSchedule;
