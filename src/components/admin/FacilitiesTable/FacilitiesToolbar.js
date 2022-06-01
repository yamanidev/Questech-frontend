import React from "react";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { Link } from "react-router-dom";

function FacilitiesToolbar(props) {
	return (
		<GridToolbarContainer
			sx={{ padding: "1rem 0.2rem", justifyContent: "space-between" }}>
			<div className="">
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
				<Button variant="contained" component={Link} to="/admin/facility/new">
					Add new facility
				</Button>
			</Stack>
		</GridToolbarContainer>
	);
}

export default FacilitiesToolbar;
