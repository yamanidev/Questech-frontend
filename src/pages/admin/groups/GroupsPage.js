import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import GroupsList from "../../../components/admin/GroupsList/GroupsList";
import adminServices from "../../../services/admin/admin-services";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { validateInteger } from "../../../utilities/input-validation";

function GroupsPage() {
	const [groups, setGroups] = useState([]);
	const [groupNumber, setGroupNumber] = useState();
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
	});

	return (
		<div className="container">
			<h1 className="mb-10 text-6xl font-semibold">{level} Groups</h1>
			<Stack spacing={1} direction="row" marginY={4}>
				<TextField
					error={groupNumberError}
					label="Group number"
					onChange={(event) => {
						// setGroupNumberError();
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
					disabled={!(groupNumber && validateInteger(groupNumber))}>
					Add
				</Button>
			</Stack>
			<GroupsList groups={groups} level={level} />
		</div>
	);
}

export default GroupsPage;
