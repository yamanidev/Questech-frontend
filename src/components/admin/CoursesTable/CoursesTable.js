import React, { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { Edit } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import adminServices from "../../../services/admin/admin-services";
import DeleteIcon from "@mui/icons-material/Delete";
import CoursesToolbar from "./CoursesToolbar";
import { useNavigate } from "react-router-dom";

function CoursesTable() {
  const [courses, setCourses] = useState();
  const [selectionModel, setSelectionModel] = useState([]);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [clickedCourse, setClickedCourse] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  function fetchCourses() {
    adminServices
      .getCourses()
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onDelete = useCallback((selectedCourseId) => () => {
    setClickedCourse(selectedCourseId);
    setDeleteModalOpened(true);
  });

  const onEdit = useCallback((selectedCourseId) => () => {
    navigate(`/admin/course/${selectedCourseId}/edit`);
  });

  const onMultiDelete = () => {
    setDeleteModalOpened(true);
  };

  const deleteCourse = (codeName) => {
    adminServices
      .deleteCourse(codeName)
      .then((response) => {
        console.log("delete course response: ", response);
        fetchCourses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onConfirmDelete = () => {
    if (selectionModel.length > 1) {
      // Ids of students to delete are in selectionModel
      for (const codeName of selectionModel) {
        deleteCourse(codeName);
      }
      fetchCourses();
    } else {
      deleteCourse(clickedCourse);
    }
    setDeleteModalOpened(false);
  };

  const columns = [
    {
      field: "code",
      headerName: "Codename",
      minWidth: 100,
      flex: 1,
      editable: false,
      hideable: false,
    },
    {
      field: "detailedName",
      headerName: "Full title",
      minWidth: 100,
      flex: 1,
      editable: false,
      hideable: false,
    },
    {
      field: "promo",
      headerName: "Level",
      sortable: false,
      minWidth: 100,
      flex: 1,
      editable: false,
      hideable: false,
    },
    {
      field: "semester",
      headerName: "Semester",
      flex: 1,
      editable: false,
    },
    {
      field: "coefficient",
      headerName: "Coefficient",
      hide: true,
      flex: 1,
      editable: false,
    },
    {
      field: "credit",
      headerName: "Credit",
      flex: 1,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      hideable: false,
      getActions: (params) => [
        <GridActionsCellItem icon={<Edit />} label="Edit" onClick={onEdit(params.id)} />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={onDelete(params.id)} />,
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
            getRowId={(params) => params.code}
            rows={courses}
            columns={columns}
            components={{
              Toolbar: CoursesToolbar,
            }}
            componentsProps={{
              toolbar: {
                onMultiDelete,
                selection: selectionModel.length < 2,
              },
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: "promo", sort: "asc" }],
              },
            }}
            checkboxSelection={true}
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
          />
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
                    ? `Are you sure you want to delete the ${selectionModel.length} selected courses?`
                    : "Are you sure you want to delete the selected course?"}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={2} marginTop={5}>
                  <Button variant="contained" onClick={onConfirmDelete}>
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

export default CoursesTable;
