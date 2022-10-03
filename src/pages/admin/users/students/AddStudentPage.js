import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import studentSVG from "../../../../assets/student.svg";
import adminServices from "../../../../services/admin/admin-services";
import { formatDate } from "../../../../utilities/date-utils";
import { validateEmail, validateName } from "../../../../utilities/input-validation";

function AddStudentPage() {
  const [datePickerDate, setDatePickerDate] = useState(new Date("2005-01-01"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  // Must follow the format YY-DD-MM
  const [dateOfBirth, setDateOfBirth] = useState(
    formatDate(
      new Date(datePickerDate).getDate(),
      new Date(datePickerDate).getMonth() + 1,
      new Date(datePickerDate).getFullYear()
    )
  );

  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    placeOfBirthError: false,
    emailError: false,
  });

  const navigate = useNavigate();

  const handleDatePickerChange = (newValue) => {
    setDateOfBirth(formatDate(newValue.getDate(), newValue.getMonth() + 1, newValue.getFullYear()));
    setDatePickerDate(newValue);
  };

  const handleSelectChange = (event) => {
    setGender(event.target.value);
  };

  const addStudent = useCallback((student) => () => {
    adminServices
      .addStudent(student)
      .then((response) => {
        console.log(response);
        navigate("/admin/students");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function getFields() {
    return {
      firstname: firstName,
      familyname: lastName,
      birthDate: dateOfBirth,
      placeBirth: placeOfBirth,
      email,
      sex: gender,
    };
  }

  function validateFields() {
    if (!firstName || !lastName || !placeOfBirth || !email || !gender) return false;
    return (
      !errors.firstNameError &&
      !errors.lastNameError &&
      !errors.placeOfBirthError &&
      !errors.emailError
    );
  }

  return (
    <div className="container">
      <h1 className="mb-10 text-6xl text-center xl:text-left font-semibold">Add New Student</h1>
      <div className="flex flex-col xl:flex-row items-center xl:items-start gap-20 xl:gap-80">
        <div className="pl-10 pt-10 xl:pt-20 flex flex-col gap-3">
          <div className="max-w-md flex gap-4">
            <TextField
              autoFocus
              fullWidth
              error={errors.firstNameError}
              label="First Name"
              onChange={(event) => {
                setErrors({
                  ...errors,
                  firstNameError: !validateName(event.target.value),
                });
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div className="max-w-md flex gap-4">
            <TextField
              fullWidth
              error={errors.lastNameError}
              label="Last Name"
              onChange={(event) => {
                setErrors({
                  ...errors,
                  lastNameError: !validateName(event.target.value),
                });
                setLastName(event.target.value);
              }}
            />
          </div>
          <div className="max-w-md flex gap-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleSelectChange}>
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="max-w-md flex gap-4">
            <TextField
              fullWidth
              error={errors.placeOfBirthError}
              label="Place of Birth"
              onChange={(event) => {
                setErrors({
                  ...errors,
                  placeOfBirthError: !validateName(event.target.value),
                });
                setPlaceOfBirth(event.target.value);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                fullWidth
                maxDate={new Date("2005-12-31")}
                minDate={new Date("1995-01-01")}
                label="Birth Date"
                inputFormat="dd/MM/yyyy"
                value={datePickerDate}
                onChange={handleDatePickerChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="max-w-md flex gap-4">
            <TextField
              fullWidth
              error={errors.emailError}
              label="Email"
              onChange={(event) => {
                setErrors({ ...errors, emailError: !validateEmail(event.target.value) });
                setEmail(event.target.value);
              }}
            />
          </div>
          <Stack spacing={2} direction="row" marginTop={5}>
            <Button variant="contained" color="error" component={Link} to="/admin/students">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={addStudent(getFields())}
              disabled={!validateFields()}>
              Create
            </Button>
          </Stack>
        </div>
        <img src={studentSVG} alt="" />
      </div>
    </div>
  );
}

export default AddStudentPage;
