import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AddTeacherPage() {
	const [datePickerDate, setDatePickerDate] = useState(Date.now());
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [placeOfBirth, setPlaceOfBirth] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [email, setEmail] = useState("");

	const handleDatePickerChange = (newValue) => {
		const day = newValue.getDate();
		const month = newValue.getMonth() + 1;
		const year = newValue.getFullYear();
		setDateOfBirth(`${day}-${month}-${year}`);
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

	const addTeacher = useCallback((teacher) => () => {
		const token = localStorage.getItem("jwtToken");
		axios
			.post(
				"http://localhost:8080/admin/user",
				{
					firstname: firstName,
					familyname: lastName,
					birthDate: dateOfBirth,
					placeBirth: placeOfBirth,
					email,
					role: "PROFESSOR",
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				console.log(response);
			});
	});

	return (
		<div className="container">
			<h1 className="mb-10 text-6xl font-semibold">Add New Teacher</h1>
			<div className="pl-10 pt-10 flex flex-col gap-3">
				<div className="flex gap-4">
					<TextField
						label="First Name"
						onChange={(event) => {
							setFirstName(event.target.value);
						}}
					/>
					<TextField
						label="Last Name"
						onChange={(event) => {
							setLastName(event.target.value);
						}}
					/>
				</div>
				<div className="flex gap-4">
					<TextField
						label="Place of Birth"
						onChange={(event) => {
							setPlaceOfBirth(event.target.value);
						}}
					/>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
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
						label="Email"
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
				</div>
				<Stack spacing={2} direction="row">
					<Button variant="contained" color="error" component={Link} to="/teachers">
						Cancel
					</Button>
					<Button variant="contained" onClick={addTeacher(getFields())}>
						Create
					</Button>
				</Stack>
			</div>
		</div>
	);
}

export default AddTeacherPage;
