import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import adminServices from "../../../../services/admin/admin-services";

function EditTeacherPage() {
	const [datePickerDate, setDatePickerDate] = useState(Date.now());
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [placeOfBirth, setPlaceOfBirth] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(true);

	const { teacherId } = useParams();

	const [teacher, setTeacher] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		getCurrentTeacher();
	}, []);

	const getCurrentTeacher = () => {
		adminServices
			.getTeacher(teacherId)
			.then((response) => {
				setFirstName(response.data.firstname);
				setLastName(response.data.familyname);
				setPlaceOfBirth(response.data.placeBirth);
				setUsername(response.data.username);
				setEmail(response.data.email);
				setDatePickerDate(Date.parse(response.data.birthDate));
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
		console.log(`${year}-${month}-${day}`);
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

	const editTeacher = useCallback((modifiedTeacher) => () => {
		adminServices
			.editTeacher(teacherId, modifiedTeacher)
			.then((response) => {
				console.log(response);
				navigate("/teachers");
			})
			.catch((error) => {
				console.log(error);
			});
	});

	return (
		<div className="container">
			{loading ? (
				<LoadingSpinner />
			) : (
				<>
					<h1 className="mb-10 text-6xl font-semibold">Edit Teacher</h1>
					<div className="pl-10 pt-10 flex flex-col gap-3">
						<div className="flex gap-4">
							<TextField
								label="First Name"
								value={firstName}
								onChange={(event) => {
									setFirstName(event.target.value);
								}}
							/>
							<TextField
								label="Last Name"
								value={lastName}
								onChange={(event) => {
									setLastName(event.target.value);
								}}
							/>
						</div>
						<div className="flex gap-4">
							<TextField
								label="Place of Birth"
								value={placeOfBirth}
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
								value={username}
								onChange={(event) => {
									setUsername(event.target.value);
								}}
							/>
							<TextField
								label="Email"
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
							/>
						</div>
						<Stack spacing={2} direction="row" marginTop={5}>
							<Button variant="contained" color="error" component={Link} to="/teachers">
								Cancel
							</Button>
							<Button variant="contained" onClick={editTeacher(getFields())}>
								Save
							</Button>
						</Stack>
					</div>
				</>
			)}
		</div>
	);
}

export default EditTeacherPage;
