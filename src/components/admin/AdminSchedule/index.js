import React, { useEffect, useState } from "react";
import adminServices from "services/admin/admin-services";
import AdminScheduleColumn from "./AdminScheduleColumn";
import TimeColumn from "components/TimeColumn";

function AdminSchedule(props) {
  const { level, groupId } = props;
  const [sundaySchedule, setSundaySchedule] = useState([]);
  const [mondaySchedule, setMondaySchedule] = useState([]);
  const [tuesdaySchedule, setTuesdaySchedule] = useState([]);
  const [wednesdaySchedule, setWednesdaySchedule] = useState([]);
  const [thursdaySchedule, setThursdaySchedule] = useState([]);
  const [sundayAvailableTime, setSundayAvailableTime] = useState([]);
  const [mondayAvailableTime, setMondayAvailableTime] = useState([]);
  const [tuesdayAvailableTime, setTuesdayAvailableTime] = useState([]);
  const [wednesdayAvailableTime, setWednesdayAvailableTime] = useState([]);
  const [thursdayAvailableTime, setThursdayAvailableTime] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchSchedule();
  }, [groupId]);

  useEffect(() => {
    fetchCourses();
  }, []);

  function fetchCourses() {
    adminServices
      .getLevelCourses(level)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchDaySchedule(day) {
    adminServices
      .getSchedule(level, groupId, day)
      .then((response) => {
        const formattedSchedule = formatSchedule(response.data);
        const available = availableTime(formattedSchedule);
        switch (day) {
          case "SUNDAY":
            setSundaySchedule(formattedSchedule);
            setSundayAvailableTime(available);
            break;
          case "MONDAY":
            setMondaySchedule(formattedSchedule);
            setMondayAvailableTime(available);
            break;
          case "TUESDAY":
            setTuesdaySchedule(formattedSchedule);
            setTuesdayAvailableTime(available);
            break;
          case "WEDNESDAY":
            setWednesdaySchedule(formattedSchedule);
            setWednesdayAvailableTime(available);
            break;
          case "THURSDAY":
            setThursdaySchedule(formattedSchedule);
            setThursdayAvailableTime(available);
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onAdd(day, session) {
    adminServices
      .addSession(level, groupId, day, session)
      .then((response) => {
        fetchDaySchedule(day);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onClear(day) {
    adminServices
      .clearDay(level, groupId, day)
      .then((response) => {
        fetchDaySchedule(day);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchSchedule() {
    fetchDaySchedule("SUNDAY");
    fetchDaySchedule("MONDAY");
    fetchDaySchedule("TUESDAY");
    fetchDaySchedule("WEDNESDAY");
    fetchDaySchedule("THURSDAY");
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

  function availableTime(formattedSchedule) {
    const available = [];
    // Checking for empty objects
    if (Object.keys(formattedSchedule[0]).length === 0) available.push("H8h_9h30");
    if (Object.keys(formattedSchedule[1]).length === 0) available.push("H9h30_11h");
    if (Object.keys(formattedSchedule[2]).length === 0) available.push("H11h_12h30");
    if (Object.keys(formattedSchedule[3]).length === 0) available.push("H2h_3h30");
    if (Object.keys(formattedSchedule[4]).length === 0) available.push("H3h30_5h");
    return available;
  }

  return (
    <div className="flex">
      <TimeColumn />
      <AdminScheduleColumn
        onAdd={onAdd}
        onClear={onClear}
        day="SUNDAY"
        daySchedule={sundaySchedule}
        availableTime={sundayAvailableTime}
        courses={courses}
      />
      <AdminScheduleColumn
        onAdd={onAdd}
        onClear={onClear}
        day="MONDAY"
        daySchedule={mondaySchedule}
        availableTime={mondayAvailableTime}
        courses={courses}
      />
      <AdminScheduleColumn
        onAdd={onAdd}
        onClear={onClear}
        day="TUESDAY"
        daySchedule={tuesdaySchedule}
        availableTime={tuesdayAvailableTime}
        courses={courses}
      />
      <AdminScheduleColumn
        onAdd={onAdd}
        onClear={onClear}
        day="WEDNESDAY"
        daySchedule={wednesdaySchedule}
        availableTime={wednesdayAvailableTime}
        courses={courses}
      />
      <AdminScheduleColumn
        onAdd={onAdd}
        onClear={onClear}
        day="THURSDAY"
        daySchedule={thursdaySchedule}
        availableTime={thursdayAvailableTime}
        courses={courses}
      />
    </div>
  );
}

export default AdminSchedule;
