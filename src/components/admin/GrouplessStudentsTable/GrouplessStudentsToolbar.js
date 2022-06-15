import React from "react";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function GrouplessStudentsToolbar(props) {
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
					component={Link}
					to={`/admin/${props.level}/group/${props.groupId}`}>
					Cancel
				</Button>
				<Button variant="contained" onClick={props.onConfirm} disabled={props.selection}>
					Confirm
				</Button>
			</Stack>
		</GridToolbarContainer>
	);
}

export default GrouplessStudentsToolbar;
