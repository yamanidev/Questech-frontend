import React from "react";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function GroupStudentsToolbar(props) {
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
					color="secondary"
					component={Link}
					to={`/admin/${props.level}/groups`}>
					Go back
				</Button>
				<Button
					variant="contained"
					color="error"
					onClick={props.onMultiDelete}
					disabled={props.selection}>
					Delete
				</Button>
				<Button
					variant="contained"
					component={Link}
					to={`/admin/${props.level}/group/${props.groupId}/add`}>
					Add student(s)
				</Button>
			</Stack>
		</GridToolbarContainer>
	);
}

export default GroupStudentsToolbar;
