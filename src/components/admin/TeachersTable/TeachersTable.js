import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Button, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./teachers-table.css";
import TeachersToolbar from "./TeachersToolbar";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

function TeachersTable() {
	const [teachers, setTeachers] = useState([]);
	const [selectionModel, setSelectionModel] = useState([]);
	const [importModalOpened, setImportModalOpened] = useState(false);
	const [deleteModalOpened, setDeleteModalOpened] = useState(false);
	const [excelFileSelected, setExcelFileSelected] = useState(false);
	const [clickedTeacher, setClickedTeacher] = useState();
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const token = localStorage.getItem("jwtToken");
	let formData = new FormData();

	useEffect(() => {
		fetchTeachers();
	}, []);

	const fetchTeachers = () => {
		axios
			.get("http://localhost:8080/admin/user/professor", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				const data = res.data.map((teacher) => {
					teacher.role = teacher.role.toLowerCase();
					return teacher;
				});
				setTeachers(data);
				setLoading(false);
			});
	};

	const deleteTeacher = (teacherId) => {
		axios
			.delete(`http://localhost:8080/admin/user/${teacherId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log("response data of delete ", res.data);
			});
	};

	const editTeacherOnClick = useCallback((teacherId) => () => {
		console.log("edit teacher clicked");
		navigate(`/teacher/${teacherId}/edit`, {
			state: {
				x: 3,
			},
		});
	});

	const deleteTeacherOnClick = useCallback((selectedTeacherId) => () => {
		setClickedTeacher(selectedTeacherId);
		setDeleteModalOpened(true);
	});

	const importOnClick = () => {
		setImportModalOpened(true);
	};

	const deleteOnClick = () => {
		setDeleteModalOpened(true);
	};

	const confirmDeleteOnClick = () => {
		setDeleteModalOpened(false);
		if (selectionModel.length > 1) {
			// Ids of teachers to delete are in selectionModel
		} else {
			deleteTeacher(clickedTeacher);
			setTimeout(() => {
				setTeachers(teachers.filter((teacher) => teacher.id !== clickedTeacher));
			});
		}
	};

	const onFileChange = (e) => {
		const file = e.target.files[0];
		formData.append("file", file);
		setExcelFileSelected(true);
	};

	const uploadExcelFile = () => {
		axios
			.post("http://localhost:8080/admin/user/professor/upload", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				fetchTeachers();
			})
			.catch((error) => console.log(error));
	};

	const columns = [
		{ field: "id", headerName: "ID", maxWidth: 100, flex: 1, editable: false },
		{
			field: "firstname",
			headerName: "First name",
			minWidth: 100,
			flex: 1,
			editable: false,
		},
		{
			field: "familyname",
			headerName: "Last name",
			minWidth: 100,
			flex: 1,
			editable: false,
		},
		{
			field: "username",
			headerName: "Username",
			minWidth: 100,
			flex: 1,
			editable: false,
		},
		{
			field: "email",
			headerName: "Email",
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			minWidth: 100,
			flex: 1,
			editable: false,
		},
		{
			field: "role",
			minWidth: 100,
			flex: 0.5,
			headerName: "Type",
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			getActions: (params) => [
				<GridActionsCellItem
					icon={<Edit />}
					label="Edit"
					onClick={editTeacherOnClick(params.id)}
				/>,
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={deleteTeacherOnClick(params.id)}
				/>,
			],
		},
	];

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<>
					<DataGrid
						rows={teachers}
						columns={columns}
						components={{
							Toolbar: TeachersToolbar,
						}}
						componentsProps={{
							toolbar: {
								importOnClick,
								deleteOnClick,
								selection: selectionModel.length < 2,
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
					{/* Import teachers modal */}
					<Modal
						open={importModalOpened}
						onClose={() => {
							setImportModalOpened(false);
							setExcelFileSelected(false);
						}}>
						<div className="modal-container">
							<Typography
								variant="h4"
								sx={{ fontWeight: "900", textAlign: "center", marginBottom: "4rem" }}>
								Import teachers
							</Typography>
							<Typography
								variant="subtitle1"
								sx={{ fontSize: "1.2rem", textAlign: "center" }}>
								Upload an excel file
							</Typography>
							<input
								type="file"
								name="file_upload"
								id="upload-button"
								onChange={onFileChange}
							/>
							<Stack direction="row" justifyContent="center" spacing={2} marginTop={5}>
								<Button
									variant="contained"
									onClick={uploadExcelFile}
									disabled={!excelFileSelected}>
									Confirm
								</Button>
								<Button
									variant="outlined"
									color="error"
									onClick={() => {
										setImportModalOpened(false);
									}}>
									Cancel
								</Button>
							</Stack>
						</div>
					</Modal>
					{/* Confirming deletion modal, should be using Dialog instead I think */}
					<Modal
						open={deleteModalOpened}
						onClose={() => {
							setDeleteModalOpened(false);
						}}>
						<div className="modal-container">
							<Stack height="100%">
								<Typography
									variant="h4"
									sx={{ fontWeight: "900", textAlign: "center", marginBottom: "4rem" }}>
									Import teachers
								</Typography>
								<Typography
									variant="subtitle1"
									sx={{ fontSize: "1.2rem", textAlign: "center" }}>
									{selectionModel.length > 1
										? `Are you sure you want to delete the ${selectionModel.length} selected teachers?`
										: "Are you sure you want to delete the selected teacher?"}
								</Typography>
								<Stack direction="row" justifyContent="center" spacing={2} marginTop={5}>
									<Button variant="contained" onClick={confirmDeleteOnClick}>
										Confirm
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={() => {
											setDeleteModalOpened(false);
										}}>
										Cancel
									</Button>
								</Stack>
							</Stack>
						</div>
					</Modal>
				</>
			)}
		</>
	);
}

export default TeachersTable;
