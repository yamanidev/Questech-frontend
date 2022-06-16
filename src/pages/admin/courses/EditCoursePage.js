import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import courseSVG from "../../../assets/course.svg";
import { validateName, validateInteger } from "../../../utilities/input-validation";
import adminServices from "../../../services/admin/admin-services";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

function EditCoursePage() {
	const [codeName, setCodeName] = useState("");
	const [loading, setLoading] = useState(true);
	const [fullTitle, setFullTitle] = useState("");
	const [level, setLevel] = useState("");
	const [semester, setSemester] = useState("");
	const [coefficient, setCoefficient] = useState("");
	const [credits, setCredits] = useState("");
	const [errors, setErrors] = useState({
		coefficientError: false,
		creditsError: false,
	});

	const { courseId } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		getCurrentCourse();
	}, []);

	function getCurrentCourse() {
		adminServices
			.getCourse(courseId)
			.then((response) => {
				const data = response.data;
				setCodeName(data.code);
				setFullTitle(data.detailedName);
				setLevel(data.promo);
				setSemester(data.semester);
				setCoefficient(data.coefficient);
				setCredits(data.credit);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function validateFields() {
		if (!codeName || !fullTitle || !level || !semester || !coefficient || !credits)
			return false;
		return !errors.coefficientError && !errors.creditsError;
	}

	function getFields() {
		return {
			code: codeName,
			detailedName: fullTitle,
			promo: level,
			semester,
			coefficient: +coefficient,
			credit: +credits,
		};
	}

	const editCourse = useCallback((course) => () => {
		adminServices
			.editCourse(courseId, course)
			.then((response) => {
				console.log(response);
				navigate("/admin/courses");
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
					<h1 className="mb-10 text-6xl text-center xl:text-left font-semibold">
						Add New Course
					</h1>
					<div className="flex flex-col xl:flex-row items-center xl:justify-between gap-20 xl:gap-0">
						<div className="pl-10 pt-10 flex flex-col gap-3">
							<div className="max-w-md flex gap-4">
								<TextField
									fullWidth
									label="Codename"
									value={codeName}
									onChange={(event) => {
										setCodeName(event.target.value.toUpperCase());
									}}
								/>
							</div>
							<div className="max-w-md flex gap-4">
								<TextField
									fullWidth
									label="Full Title"
									value={fullTitle}
									onChange={(event) => {
										setFullTitle(event.target.value);
									}}
								/>
							</div>
							<div className="max-w-md flex gap-4">
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Level</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={level}
										label="Level"
										onChange={(event) => {
											setLevel(event.target.value);
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
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Semester</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={semester}
										label="Semester"
										onChange={(event) => {
											setSemester(event.target.value);
										}}>
										<MenuItem value={1}>S1</MenuItem>
										<MenuItem value={2}>S2</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div className="max-w-md flex gap-4">
								<TextField
									fullWidth
									label="Coefficient"
									value={coefficient}
									error={errors.coefficientError}
									onChange={(event) => {
										setCoefficient(event.target.value);
										setErrors({
											...errors,
											coefficientError: !validateInteger(event.target.value),
										});
									}}
								/>
								<TextField
									fullWidth
									label="Credits"
									value={credits}
									error={errors.creditsError}
									onChange={(event) => {
										setCredits(event.target.value);
										setErrors({
											...errors,
											creditsError: !validateInteger(event.target.value),
										});
									}}
								/>
							</div>
							<Stack spacing={2} direction="row" marginTop={5}>
								<Button
									variant="contained"
									color="error"
									component={Link}
									to="/admin/courses">
									Cancel
								</Button>
								<Button
									variant="contained"
									onClick={editCourse(getFields())}
									disabled={!validateFields()}>
									Save
								</Button>
							</Stack>
						</div>
						<img src={courseSVG} alt="" />
					</div>
				</>
			)}
		</div>
	);
}

export default EditCoursePage;
