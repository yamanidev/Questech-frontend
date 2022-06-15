import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function GroupsListItem(props) {
	const { groupNumber, level } = props;

	return (
		<div className="py-4 px-5 flex justify-between text-xl">
			<Link to={`/admin/${level}/group/${groupNumber}`} className="flex-1">
				Group {groupNumber}
			</Link>
			<IconButton
				onClick={() => {
					props.onDelete(groupNumber);
				}}>
				<DeleteIcon />
			</IconButton>
		</div>
	);
}

export default GroupsListItem;
