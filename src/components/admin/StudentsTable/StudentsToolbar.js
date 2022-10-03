import React from "react";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { Link } from "react-router-dom";

function TeachersToolbar(props) {
  return (
    <GridToolbarContainer sx={{ padding: "1rem 0.2rem", justifyContent: "space-between" }}>
      <div className="">
        <Button onClick={props.importOnClick}>
          <UploadIcon fontSize="small" />
          Import
        </Button>
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        />
      </div>
      <Stack direction="row" justifyContent="center" spacing={2} marginRight={2}>
        <Button
          variant="contained"
          color="error"
          onClick={props.deleteOnClick}
          disabled={props.selection}>
          Delete
        </Button>
        <Button variant="contained" component={Link} to="/admin/student/new">
          Add new student
        </Button>
      </Stack>
    </GridToolbarContainer>
  );
}

export default TeachersToolbar;
