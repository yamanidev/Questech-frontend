import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AvailableFacilitiesTable from "../../../components/teacher/AvailableFacilitiesTable/AvailableFacilitiesTable";

function FacilitiesPageTeacher() {
	const [day, setDay] = useState("");
	const [time, setTime] = useState("");

	return (
		<div className="container relative">
			<h1 className="mb-10 text-6xl font-semibold">Facilities</h1>
			<div className="">
				<div className="mb-10 flex flex-wrap gap-4">
					<FormControl sx={{ width: "200px" }}>
						<InputLabel>Day</InputLabel>
						<Select
							value={day}
							label="Day"
							onChange={(event) => {
								setDay(event.target.value);
							}}>
							<MenuItem value="SUNDAY">Sunday</MenuItem>
							<MenuItem value="MONDAY">Monday</MenuItem>
							<MenuItem value="TUESDAY">Tuesday</MenuItem>
							<MenuItem value="WEDNESDAY">Wednesday</MenuItem>
							<MenuItem value="THURSDAY">Thursday</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ width: "200px" }}>
						<InputLabel>Time</InputLabel>
						<Select
							value={time}
							label="Time"
							onChange={(event) => {
								setTime(event.target.value);
							}}>
							<MenuItem value="H8h_9h30">8h-9h30</MenuItem>
							<MenuItem value="H9h30_11h">9h30-11h</MenuItem>
							<MenuItem value="H11h_12h30">11h-12h30</MenuItem>
							<MenuItem value="H2h_3h30">14h-15h30</MenuItem>
							<MenuItem value="H3h30_5h">15h30-17h</MenuItem>
						</Select>
					</FormControl>
				</div>
				{day && time && (
					<div className="h-[600px] max-w-lg">
						<AvailableFacilitiesTable day={day} time={time} />
					</div>
				)}
			</div>
		</div>
	);
}

export default FacilitiesPageTeacher;
