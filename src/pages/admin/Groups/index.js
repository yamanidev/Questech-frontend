import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import GroupsList from "~/components/admin/GroupsList";
import adminServices from "~/services/admin/admin-services";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { validateInteger } from "~/utilities/input-validation";

function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [groupNumber, setGroupNumber] = useState("");
  const [groupNumberError, setGroupNumberError] = useState(false);
  const { level } = useParams();

  useEffect(() => {
    fetchGroups();
  }, []);

  function fetchGroups() {
    adminServices
      .getGroups(level)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addGroup = useCallback((group) => () => {
    adminServices
      .addGroup(group)
      .then((response) => {
        console.log(response);
        fetchGroups();
      })
      .catch((error) => {
        console.log(error);
      });
    setGroupNumber("");
  });

  function onDelete(groupId) {
    adminServices
      .deleteGroup(level, groupId)
      .then((response) => {
        console.log("delete group response:", response);
        fetchGroups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function validateGroupNumber(groupNumber) {
    return (
      groupNumber &&
      validateInteger(groupNumber) &&
      !groups.find((group) => group.groupId.id === parseInt(groupNumber))
    );
  }

  return (
    <div className="container">
      <h1 className="mb-10 text-6xl font-semibold">{level} Groups</h1>
      <Stack spacing={1} direction="row" marginY={4}>
        <TextField
          value={groupNumber}
          error={groupNumberError}
          label="Group number"
          onChange={(event) => {
            setGroupNumberError(!validateGroupNumber(event.target.value));
            setGroupNumber(event.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={addGroup({
            groupId: {
              promo: level,
              id: groupNumber,
            },
          })}
          disabled={!validateGroupNumber(groupNumber)}>
          Add Group
        </Button>
      </Stack>
      <GroupsList groups={groups} level={level} onDelete={onDelete} />
    </div>
  );
}

export default GroupsPage;
