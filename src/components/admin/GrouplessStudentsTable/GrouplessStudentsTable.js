import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import adminServices from "../../../services/admin/admin-services";
import { DataGrid } from "@mui/x-data-grid";
import GrouplessStudentsToolbar from "./GrouplessStudentsToolbar";
import { useNavigate } from "react-router-dom";

function GrouplessStudentsTable(props) {
	const { level, groupId } = props;
	const [grouplessStudents, setGrouplessStudents] = useState([]);
	const [selectionModel, setSelectionModel] = useState([]);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		fetchStudents();
	}, []);

	function fetchStudents() {
		adminServices
			.getStudents()
			.then((response) => {
				const data = response.data
					.filter((student) => !student.group)
					.map((student) => {
						student.sex = student.sex.toLowerCase();
						return student;
					});
				setGrouplessStudents(data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const onConfirm = () => {
		adminServices
			.addStudentsToGroup(level, groupId, selectionModel)
			.then((response) => {
				console.log(response);
				navigate(`/admin/${level}/group/${groupId}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const columns = [
		{
			field: "familyname",
			headerName: "Last name",
			minWidth: 100,
			flex: 1,
			editable: false,
			hideable: false,
		},
		{
			field: "firstname",
			headerName: "First name",
			minWidth: 100,
			flex: 1,
			editable: false,
			hideable: false,
		},
		{
			field: "email",
			headerName: "Email",
			sortable: false,
			minWidth: 100,
			flex: 1,
			editable: false,
			hideable: false,
		},
		{
			field: "birthDate",
			headerName: "Birth date",
			flex: 1,
			editable: false,
		},
		{
			field: "placeBirth",
			headerName: "Place of birth",
			hide: true,
			flex: 1,
			editable: false,
		},
		{
			field: "sex",
			headerName: "Gender",
			flex: 1,
			editable: false,
		},
	];

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<DataGrid
					rows={grouplessStudents}
					columns={columns}
					components={{
						Toolbar: GrouplessStudentsToolbar,
					}}
					componentsProps={{
						toolbar: {
							level,
							groupId,
							onConfirm,
							selection: selectionModel.length === 0,
						},
					}}
					initialState={{
						sorting: {
							sortModel: [{ field: "id", sort: "asc" }],
						},
					}}
					checkboxSelection={true}
					selectionModel={selectionModel}
					onSelectionModelChange={(newSelectionModel) => {
						setSelectionModel(newSelectionModel);
					}}
				/>
			)}
		</>
	);
}

export default GrouplessStudentsTable;
