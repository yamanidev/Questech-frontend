import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminServices from "../../../../services/admin/admin-services";
import { formatDate } from "../../../../utilities/date-utils";
import { validateEmail, validateName } from "../../../../utilities/input-validation";

function AddTeacherPage() {
	const [datePickerDate, setDatePickerDate] = useState(new Date("1970-01-01"));
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
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
		setDateOfBirth(
			formatDate(newValue.getDate(), newValue.getMonth() + 1, newValue.getFullYear())
		);
		setDatePickerDate(newValue);
	};

	function getFields() {
		return {
			firstname: firstName,
			familyname: lastName,
			birthDate: dateOfBirth,
			placeBirth: placeOfBirth,
			email,
		};
	}

	function validateFields() {
		return !!(
			validateName(firstName) &&
			validateName(lastName) &&
			validateName(placeOfBirth) &&
			validateEmail(email)
		);
	}

	const addTeacher = useCallback((teacher) => () => {
		adminServices
			.addTeacher(teacher)
			.then((response) => {
				console.log(response);
				navigate("/teachers");
			})
			.catch((error) => {
				console.log(error);
			});
	});

	return (
		<div className="container relative">
			<h1 className="mb-10 text-6xl font-semibold">Add New Teacher</h1>
			<div className="pl-10 pt-10 flex flex-col gap-3">
				<div className="flex gap-4">
					<TextField
						error={errors.firstNameError}
						label="First Name"
						onChange={(event) => {
							setFirstName(event.target.value);
							setErrors({ ...errors, firstNameError: !validateName(event.target.value) });
						}}
					/>
					<TextField
						error={errors.lastNameError}
						label="Last Name"
						onChange={(event) => {
							setLastName(event.target.value.toUpperCase());
							setErrors({ ...errors, lastNameError: !validateName(event.target.value) });
						}}
					/>
				</div>
				<div className="flex gap-4">
					<TextField
						error={errors.placeOfBirthError}
						label="Place of Birth"
						onChange={(event) => {
							setPlaceOfBirth(event.target.value);
							setErrors({
								...errors,
								placeOfBirthError: !validateName(event.target.value),
							});
						}}
					/>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
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
				<div className="flex gap-4">
					<TextField
						error={errors.emailError}
						label="Email"
						onChange={(event) => {
							setEmail(event.target.value);
							setErrors({ ...errors, emailError: !validateEmail(event.target.value) });
						}}
					/>
				</div>
				<Stack spacing={2} direction="row" marginTop={5}>
					<Button variant="contained" color="error" component={Link} to="/teachers">
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={addTeacher(getFields())}
						disabled={!validateFields()}>
						Create
					</Button>
				</Stack>
			</div>
		</div>
	);
}

export default AddTeacherPage;
