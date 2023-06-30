import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import facilitiesSVG from "~/assets/facilities.svg";
import adminServices from "~/services/admin/admin-services";

function AddFacilityPage() {
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("");

  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setFacilityType(event.target.value);
  };

  function validateFields() {
    return facilityName && facilityType;
  }

  function getFields() {
    return {
      name: facilityName,
      type: facilityType,
    };
  }

  const addFacility = useCallback((facility) => () => {
    adminServices
      .addFacility(facility)
      .then((response) => {
        console.log(response);
        navigate("/admin/facilities");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="container">
      <h1 className="mb-10 text-6xl text-center xl:text-left font-semibold">Add New Facility</h1>
      <div className="flex flex-col xl:flex-row items-center xl:items-start gap-20 xl:gap-80">
        <div className="pl-10 pt-10 xl:pt-20 flex flex-col gap-3">
          <div className="max-w-md flex gap-4">
            <TextField
              fullWidth
              autoFocus
              label="Facility name"
              onChange={(event) => {
                setFacilityName(event.target.value);
              }}
            />
          </div>
          <div className="max-w-md flex gap-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Facility Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={facilityType}
                label="Facility Type"
                onChange={handleSelectChange}>
                <MenuItem value="Amphi">Amphitheatre</MenuItem>
                <MenuItem value="TD">TD Classroom</MenuItem>
                <MenuItem value="TP">TP Classroom</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Stack spacing={2} direction="row" marginTop={5}>
            <Button variant="contained" color="error" component={Link} to="/admin/facilities">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={addFacility(getFields())}
              disabled={!validateFields()}>
              Create
            </Button>
          </Stack>
        </div>
        <img src={facilitiesSVG} alt="" />
      </div>
    </div>
  );
}

export default AddFacilityPage;
