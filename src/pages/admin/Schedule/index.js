import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import AdminSchedule from "components/admin/AdminSchedule";
import adminServices from "services/admin/admin-services";

function SchedulePageAdmin() {
  const [level, setLevel] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);
  const [fetchingGroups, setFetchingGroups] = useState(true);

  function getGroups(level) {
    adminServices
      .getGroups(level)
      .then((response) => {
        setGroups(response.data);
        setFetchingGroups(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container pb-20">
      <h1 className="mb-10 text-6xl font-semibold">Schedules</h1>
      <div className="">
        <div className="mb-10 flex flex-wrap gap-4">
          <FormControl sx={{ width: "200px" }}>
            <InputLabel>Level</InputLabel>
            <Select
              value={level}
              label="Level"
              onChange={(event) => {
                setLevel(event.target.value);
                setGroupId("");
                getGroups(event.target.value);
              }}>
              <MenuItem value="CP1">CP1</MenuItem>
              <MenuItem value="CP2">CP2</MenuItem>
              <MenuItem value="CS1">CS1</MenuItem>
              <MenuItem value="CS2SIW">CS2SIW</MenuItem>
              <MenuItem value="CS2ISI">CS2ISI</MenuItem>
              <MenuItem value="CS3SIW">CS3SIW</MenuItem>
              <MenuItem value="CS3ISI">CS3ISI</MenuItem>
            </Select>
          </FormControl>
          {!fetchingGroups && (
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={groupId}
                label="Group"
                onChange={(event) => {
                  setGroupId(event.target.value);
                }}>
                {groups.map((group, index) => (
                  <MenuItem key={index} value={group.groupId.id}>
                    G{group.groupId.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>

        {level && groupId && (
          <>
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
            <AdminSchedule level={level} groupId={groupId} />
          </>
        )}
      </div>
    </div>
  );
}

export default SchedulePageAdmin;
