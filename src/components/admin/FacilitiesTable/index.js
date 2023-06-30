import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import adminServices from "~/services/admin/admin-services";
import LoadingSpinner from "~/components/LoadingSpinner";
import "./facilities-table.css";
import FacilitiesToolbar from "./FacilitiesToolbar";

function FacilitiesTable() {
  const [facilities, setFacilities] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [clickedFacility, setClickedFacility] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = () => {
    adminServices
      .getFacilities()
      .then((response) => {
        setFacilities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteFacility = (facilityId) => {
    adminServices
      .deleteFacility(facilityId)
      .then((response) => {
        console.log("delete facility response: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteFacilityOnClick = useCallback((selectedFacilityId) => () => {
    setClickedFacility(selectedFacilityId);
    setDeleteModalOpened(true);
  });

  const deleteOnClick = () => {
    setDeleteModalOpened(true);
  };

  const confirmDeleteOnClick = () => {
    setDeleteModalOpened(false);
    if (selectionModel.length > 1) {
      // Ids of facilities to delete are in selectionModel
      for (const facilityId of selectionModel) {
        deleteFacility(facilityId);
        fetchFacilities();
      }
    } else {
      deleteFacility(clickedFacility);
      setTimeout(() => {
        setFacilities(facilities.filter((facility) => facility.id !== clickedFacility));
      });
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1,
      editable: false,
      hideable: false,
    },
    {
      field: "type",
      headerName: "Type",
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
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteFacilityOnClick(params.id)}
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
            rows={facilities}
            columns={columns}
            components={{
              Toolbar: FacilitiesToolbar,
            }}
            componentsProps={{
              toolbar: {
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
                  Delete Facility
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {selectionModel.length > 1
                    ? `Are you sure you want to delete the ${selectionModel.length} selected facilities?`
                    : "Are you sure you want to delete the selected facility?"}
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

export default FacilitiesTable;
