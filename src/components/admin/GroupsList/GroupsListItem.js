import React from "react";
import { Link } from "react-router-dom";

function GroupsListItem(props) {
	const { groupNumber, level } = props;
	return (
		<Link to={`/admin/${level}/group/${groupNumber}`} className="py-4 px-5 text-xl">
			Group {groupNumber}
		</Link>
	);
}

export default GroupsListItem;
