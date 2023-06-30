import React, { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import adminServices from "~/services/admin/admin-services";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupStudentsToolbar from "./GroupStudentsToolbar";

function GroupStudentsTable(props) {
  const { level, groupId } = props;
  const [groupStudents, setGroupStudents] = useState();
  const [selectionModel, setSelectionModel] = useState([]);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [clickedStudent, setClickedStudent] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchGroupStudents();
  }, []);

  function fetchGroupStudents() {
    adminServices
      .getGroupStudents(level, groupId)
      .then((response) => {
        setGroupStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onDelete = useCallback((selectedStudentId) => () => {
    setClickedStudent(selectedStudentId);
    setDeleteModalOpened(true);
  });

  const onMultiDelete = () => {
    setDeleteModalOpened(true);
  };

  const deleteStudents = (studentIds) => {
    adminServices
      .deleteGroupStudents(level, groupId, studentIds)
      .then((response) => {
        console.log("delete student response: ", response.data);
        fetchGroupStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onConfirmDelete = () => {
    setDeleteModalOpened(false);
    if (selectionModel.length > 1) {
      // Ids of students to delete are in selectionModel
      console.log("mutli");
      deleteStudents(selectionModel);
    } else {
      console.log("uni");
      deleteStudents([clickedStudent]);
    }
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
            rows={groupStudents}
            columns={columns}
            components={{
              Toolbar: GroupStudentsToolbar,
            }}
            componentsProps={{
              toolbar: {
                level,
                groupId,
                onMultiDelete,
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
          {/* Confirming deletion modal, should be using Dialog instead I think */}
          <Modal
            open={deleteModalOpened}
            onClose={() => {
              setDeleteModalOpened(false);
            }}>
            <div className="w-[25rem] h-[25rem] p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg">
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

export default GroupStudentsTable;
