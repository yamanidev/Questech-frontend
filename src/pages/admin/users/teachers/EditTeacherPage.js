import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import teacherSVG from "assets/teacher.svg";
import adminServices from "services/admin/admin-services";
import { validateEmail, validateName, validatePhoneNumber } from "utilities/input-validation";

function EditTeacherPage() {
  const [datePickerDate, setDatePickerDate] = useState(new Date("1970-01-01"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    placeOfBirthError: false,
    emailError: false,
    phoneNumberError: false,
    academicLevelError: false,
  });
  const [loading, setLoading] = useState(true);

  const currentTeacher = useRef();

  const { teacherId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentTeacher();
  }, []);

  const getCurrentTeacher = () => {
    adminServices
      .getTeacher(teacherId)
      .then((response) => {
        currentTeacher.current = response.data;
        setFirstName(response.data.firstname);
        setLastName(response.data.familyname);
        setPlaceOfBirth(response.data.placeBirth);
        setDatePickerDate(Date.parse(response.data.birthDate));
        setDateOfBirth(response.data.birthDate);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setAcademicLevel(response.data.academicLevel);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDatePickerChange = (newValue) => {
    const day = newValue.getDate();
    const month = newValue.getMonth() + 1;
    const year = newValue.getFullYear();
    setDateOfBirth(`${year}-${month}-${day}`);
    setDatePickerDate(newValue);
  };

  function getFields() {
    return {
      ...currentTeacher.current,
      firstname: firstName,
      familyname: lastName,
      birthDate: dateOfBirth,
      placeBirth: placeOfBirth,
      email,
      phoneNumber,
      academicLevel,
    };
  }

  function validateFields() {
    if (!firstName || !lastName || !placeOfBirth || !email || !phoneNumber || !academicLevel)
      return false;
    return (
      !errors.firstNameError &&
      !errors.lastNameError &&
      !errors.placeOfBirthError &&
      !errors.emailError &&
      !errors.phoneNumberError &&
      !errors.academicLevelError
    );
  }

  const editTeacher = useCallback((modifiedTeacher) => () => {
    adminServices
      .editTeacher(teacherId, modifiedTeacher)
      .then((response) => {
        console.log(response);
        navigate("/admin/teachers");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="container relative">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="mb-10 text-6xl text-center xl:text-left font-semibold">Edit Teacher</h1>
          <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-20 xl:gap-0">
            <div className="pl-10 pt-10 flex flex-col gap-3">
              <div className="max-w-md flex gap-4">
                <TextField
                  fullWidth
                  error={errors.firstNameError}
                  label="First Name"
                  value={firstName}
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
                  value={lastName}
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
                <TextField
                  fullWidth
                  error={errors.placeOfBirthError}
                  label="Place of Birth"
                  value={placeOfBirth}
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
                    maxDate={new Date("1997-12-31")}
                    minDate={new Date("1957-01-01")}
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
                  value={email}
                  onChange={(event) => {
                    setErrors({
                      ...errors,
                      emailError: !validateEmail(event.target.value),
                    });
                    setEmail(event.target.value);
                  }}
                />
                <TextField
                  label="Phone number"
                  fullWidth
                  value={phoneNumber}
                  error={errors.phoneNumberError}
                  onChange={(event) => {
                    setErrors({
                      ...errors,
                      phoneNumberError: !validatePhoneNumber(event.target.value),
                    });
                    setPhoneNumber(event.target.value);
                  }}
                />
              </div>
              <div className="max-w-md flex gap-4">
                <TextField
                  error={errors.academicLevelError}
                  label="Academic level"
                  value={academicLevel}
                  fullWidth
                  onChange={(event) => {
                    setErrors({
                      ...errors,
                      academicLevelError: !(event.target.value.length >= 9),
                    });
                    setAcademicLevel(event.target.value);
                  }}
                />
              </div>
              <Stack spacing={2} direction="row" marginTop={5}>
                <Button variant="contained" color="error" component={Link} to="/admin/teachers">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={editTeacher(getFields())}
                  disabled={!validateFields()}>
                  Save
                </Button>
              </Stack>
            </div>
            <img src={teacherSVG} alt="" />
          </div>
        </>
      )}
    </div>
  );
}

export default EditTeacherPage;
