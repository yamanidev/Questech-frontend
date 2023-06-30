import { Button, Stack, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import adminServices from "~/services/admin/admin-services";
import "./modal.css";
import ScheduleTimeSlot from "./ScheduleTimeSlot";

function AdminScheduleColumn(props) {
  const { day, daySchedule, availableTime, courses, onAdd, onClear } = props;
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [clearModalOpened, setClearModalOpened] = useState(false);
  // Modal fields
  const [type, setType] = useState("");
  const [course, setCourse] = useState("");
  const [time, setTime] = useState("");
  const [teacher, setTeacher] = useState({
    fullName: "",
  });
  const [facility, setFacility] = useState({
    name: "",
  });
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [availableFacilities, setAvailableFacilities] = useState([]);
  const [fetchingTeachers, setFetchingTeachers] = useState(true);
  const [fetchingFacilities, setFetchingFacilities] = useState(true);

  function getAvailableTeachers(time) {
    adminServices
      .getAvailableTeachers(day, time)
      .then((response) => {
        setAvailableTeachers(response.data);
        setFetchingTeachers(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAvailableFacilities(time) {
    adminServices
      .getAvailableFacilities(day, time)
      .then((response) => {
        setAvailableFacilities(response.data);
        setFetchingFacilities(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function formatTime(time) {
    return time.split("_").join("-").substring(1);
  }

  function getFields() {
    return {
      time,
      type,
      professorId: teacher.id,
      moduleCode: course.code,
      location: facility.id,
    };
  }

  function clearFields() {
    setType("");
    setCourse("");
    setTime("");
    setAvailableTeachers([]);
    setFetchingTeachers(true);
    setAvailableFacilities([]);
    setFetchingFacilities(true);
  }

  return (
    <>
      <div className="flex flex-col flex-grow text-center">
        <div className="h-[100px] bg-[#EEECE1] border border-gray-500">
          <h3 className="text-xl font-semibold">{day[0] + day.substring(1).toLowerCase()}</h3>
          <Stack spacing={2} direction="row" marginTop={2} justifyContent="center">
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setAddModalOpened(true);
              }}>
              Add
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setClearModalOpened(true);
                clearFields();
              }}>
              Clear
            </Button>
          </Stack>
        </div>
        {daySchedule.map((session, index) => {
          return <ScheduleTimeSlot key={index} session={session} />;
        })}
      </div>
      {/* Add session modal */}
      <Modal
        open={addModalOpened}
        onClose={() => {
          setAddModalOpened(false);
        }}>
        <div className="modal-container">
          <Typography
            variant="h4"
            sx={{ fontWeight: "900", textAlign: "center", marginBottom: "4rem" }}>
            Add session
          </Typography>
          <Stack direction="column">
            <Stack direction="row" spacing={2} maxWidth="500px">
              <FormControl sx={{ width: "200px" }}>
                <InputLabel>Session type</InputLabel>
                <Select
                  value={type}
                  label="Type"
                  onChange={(event) => {
                    setType(event.target.value);
                  }}>
                  <MenuItem value="COURS">Lecture</MenuItem>
                  <MenuItem value="TD">TD</MenuItem>
                  <MenuItem value="TP">TP</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ flexGrow: "1" }}>
                <InputLabel>Course</InputLabel>
                <Select
                  value={course}
                  label="Course"
                  onChange={(event) => {
                    setCourse(event.target.value);
                  }}>
                  {courses.map((course, index) => (
                    <MenuItem key={index} value={course}>
                      {course.detailedName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack marginY={3} maxWidth="500px">
              <FormControl sx={{ minWidth: "200px" }}>
                <InputLabel>Time</InputLabel>
                <Select
                  value={time}
                  label="Time"
                  onChange={(event) => {
                    setTime(event.target.value);
                    setTeacher("");
                    getAvailableTeachers(event.target.value);
                    setFacility("");
                    getAvailableFacilities(event.target.value);
                  }}>
                  {availableTime.map((time, index) => (
                    <MenuItem key={index} value={time}>
                      {formatTime(time)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            {!fetchingTeachers && !fetchingFacilities && (
              <Stack direction="row" spacing={2} maxWidth="500px">
                <FormControl sx={{ flexGrow: "1" }}>
                  <InputLabel>Teacher</InputLabel>
                  <Select
                    value={teacher}
                    label="Teacher"
                    onChange={(event) => {
                      setTeacher(event.target.value);
                    }}>
                    {availableTeachers.map((teacher, index) => (
                      <MenuItem key={index} value={teacher}>
                        {teacher.firstname} {teacher.familyname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel>Facility</InputLabel>
                  <Select
                    value={facility}
                    label="Facility"
                    onChange={(event) => {
                      setFacility(event.target.value);
                    }}>
                    {availableFacilities.map((facility, index) => (
                      <MenuItem key={index} value={facility}>
                        {facility.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}
            <Stack
              direction="row"
              justifyContent="end"
              alignSelf="flex-end"
              spacing={1}
              marginTop={4}>
              <Button
                variant="contained"
                disabled={!type || !course || !time || !teacher || !facility}
                onClick={() => {
                  onAdd(day, getFields());
                  clearFields();
                  setAddModalOpened(false);
                }}>
                Confirm
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAddModalOpened(false);
                  setTime("");
                  setAvailableTeachers([]);
                  setFetchingTeachers(true);
                  setAvailableFacilities([]);
                  setFetchingFacilities(true);
                }}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </div>
      </Modal>
      {/* Confirming clear, should be using Dialog instead I think */}
      <Modal
        open={clearModalOpened}
        onClose={() => {
          setClearModalOpened(false);
        }}>
        <div className="modal-container">
          <Stack height="100%">
            <Typography
              variant="h4"
              sx={{ fontWeight: "900", textAlign: "center", marginBottom: "4rem" }}>
              Clear day
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", textAlign: "center" }}>
              Are you sure you want to clear {day}?
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2} marginTop={5}>
              <Button
                variant="contained"
                onClick={() => {
                  onClear(day);
                  setClearModalOpened(false);
                }}>
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setClearModalOpened(false);
                }}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </div>
      </Modal>
    </>
  );
}

export default AdminScheduleColumn;
