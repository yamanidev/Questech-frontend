import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import adminServices from "../../../services/admin/admin-services";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import "./teachers-table.css";
import TeachersToolbar from "./TeachersToolbar";

function TeachersTable() {
	const [teachers, setTeachers] = useState([]);
	const [selectionModel, setSelectionModel] = useState([]);
	const [importModalOpened, setImportModalOpened] = useState(false);
	const [deleteModalOpened, setDeleteModalOpened] = useState(false);
	const [clickedTeacher, setClickedTeacher] = useState();
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const formData = useRef(new FormData());

	useEffect(() => {
		fetchTeachers();
	}, []);

	const fetchTeachers = () => {
		adminServices
			.getTeachers()
			.then((response) => {
				const data = response.data.map((teacher) => {
					teacher.role = teacher.role.toLowerCase();
					return teacher;
				});

				setTeachers(data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteTeacher = (teacherId) => {
		adminServices
			.deleteUser(teacherId)
			.then((response) => {
				console.log("delete teacher response: ", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const editTeacherOnClick = useCallback((teacherId) => () => {
		navigate(`/teacher/${teacherId}/edit`);
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
			for (const teacherId of selectionModel) {
				deleteTeacher(teacherId);
				fetchTeachers();
			}
		} else {
			deleteTeacher(clickedTeacher);
			setTimeout(() => {
				setTeachers(teachers.filter((teacher) => teacher.id !== clickedTeacher));
			});
		}
	};

	const onFileChange = (event) => {
		const file = event.target.files[0];
		formData.current.append("file", file);
	};

	const uploadExcelFile = () => {
		const token = localStorage.getItem("jwtToken");
		axios
			.post("http://localhost:8080/admin/user/professor/upload", formData.current, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				fetchTeachers();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const columns = [
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
								accept=".xlsx"
								id="upload-button"
								onChange={onFileChange}
							/>
							<Stack direction="row" justifyContent="center" spacing={2} marginTop={5}>
								<Button variant="contained" onClick={uploadExcelFile}>
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
									Delete Teacher
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