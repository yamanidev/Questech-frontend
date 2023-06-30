import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminServices from "~/services/admin/admin-services";
import LoadingSpinner from "~/components/LoadingSpinner";
import "./students-table.css";
import StudentsToolbar from "./StudentsToolbar";

function StudentsTable() {
  const [students, setStudents] = useState();
  const [selectionModel, setSelectionModel] = useState([]);
  const [importModalOpened, setImportModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [clickedStudent, setClickedStudent] = useState();
  const [excelFileSelected, setExcelFileSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const formData = useRef(new FormData());

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    adminServices
      .getStudents()
      .then((response) => {
        const data = response.data.map((student) => {
          student.sex = student.sex.toLowerCase();
          return student;
        });
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStudent = (studentId) => {
    adminServices
      .deleteUser(studentId)
      .then((response) => {
        console.log("delete student response: ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editStudentOnClick = useCallback((studentId) => () => {
    navigate(`/admin/student/${studentId}/edit`);
  });

  const deleteStudentOnClick = useCallback((selectedStudentId) => () => {
    setClickedStudent(selectedStudentId);
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
      // Ids of students to delete are in selectionModel
      for (const studentId of selectionModel) {
        deleteStudent(studentId);
        fetchStudents();
      }
    } else {
      deleteStudent(clickedStudent);
      setTimeout(() => {
        setStudents(students.filter((student) => student.id !== clickedStudent));
      });
    }
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    formData.current.append("file", file);
    setExcelFileSelected(true);
  };

  const uploadExcelFile = () => {
    adminServices
      .importStudents(formData.current)
      .then((response) => {
        console.log(response);
        fetchStudents();
      })
      .catch((error) => {
        console.log(error);
        window.location.reload(false);
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
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      hideable: false,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={editStudentOnClick(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteStudentOnClick(params.id)}
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
            rows={students}
            columns={columns}
            components={{
              Toolbar: StudentsToolbar,
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
          {/* Import students modal */}
          <Modal
            open={importModalOpened}
            onClose={() => {
              setImportModalOpened(false);
              setExcelFileSelected(false);
            }}>
            <div className="p-8 bg-white top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 rounded-lg w-[25rem] h-[25rem]">
              <Typography
                variant="h4"
                sx={{ fontWeight: "900", textAlign: "center", marginBottom: "4rem" }}>
                Import students
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                Upload an excel file
              </Typography>
              <input
                type="file"
                name="file_upload"
                accept=".xlsx"
                className="inline-block my-8 text-center"
                onChange={onFileChange}
              />
              <Stack direction="row" justifyContent="center" spacing={2} marginTop={5}>
                <Button variant="contained" onClick={uploadExcelFile} disabled={!excelFileSelected}>
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setImportModalOpened(false);
                    setExcelFileSelected(false);
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
                  Delete Student
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {selectionModel.length > 1
                    ? `Are you sure you want to delete the ${selectionModel.length} selected students?`
                    : "Are you sure you want to delete the selected student?"}
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

export default StudentsTable;
