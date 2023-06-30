import React, { useEffect, useState } from "react";
import teacherServices from "~/services/teacher/teacher-services";
import { DataGrid } from "@mui/x-data-grid";
import LoadingSpinner from "~/components/LoadingSpinner";

function AvailableFacilitiesTable(props) {
  const { day, time } = props;
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailableFacilities();
  }, [day, time]);

  function fetchAvailableFacilities() {
    teacherServices
      .getAvailableFacilities(day, time)
      .then((response) => {
        setFacilities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
  ];

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <DataGrid
          columns={columns}
          rows={facilities}
          initialState={{
            sorting: {
              sortModel: [{ field: "type", sort: "asc" }],
            },
          }}
        />
      )}
    </>
  );
}

export default AvailableFacilitiesTable;
