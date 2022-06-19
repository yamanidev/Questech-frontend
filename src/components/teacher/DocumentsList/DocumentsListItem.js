import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton } from "@mui/material";

function DocumentsListItem() {
	function onDelete() {}

	return (
		<div className="">
			<div className="">
				<IconButton>
					<FileDownloadIcon />
					Some cool title I bet
				</IconButton>
			</div>
			<IconButton
				onClick={() => {
					onDelete(groupNumber);
				}}>
				<DeleteIcon />
			</IconButton>
		</div>
	);
}

export default DocumentsListItem;
