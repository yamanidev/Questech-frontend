import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EditTeacherPage(props) {
	const [datePickerDate, setDatePickerDate] = useState(Date.now());
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [placeOfBirth, setPlaceOfBirth] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");

	const { teacherId } = useParams();

	// Must figure out a way to copy over data of the current teacher
	// Fill out the fields with the existing data

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

	const editTeacher = useCallback((newTeacher) => () => {
		const token = localStorage.getItem("jwtToken");
		axios
			.put(`http://localhost:8080/admin/user/${teacherId}`, newTeacher, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response);
			});
	});

	return (
		<div className="container">
			<h1 className="mb-10 text-6xl font-semibold">Edit Teacher</h1>
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
						label="Username"
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
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
					<Button variant="contained" onClick={editTeacher(getFields())}>
						Edit
					</Button>
				</Stack>
			</div>
		</div>
	);
}

export default EditTeacherPage;
