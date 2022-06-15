import React from "react";
import GroupsListItem from "./GroupsListItem";

function GroupsList(props) {
	const { groups, level } = props;

	if (groups.length === 0) return null;

	return (
		<div className="max-w-sm mx-auto lg:mx-0 py-2 flex flex-col rounded bg-gray-200 overflow-hidden">
			{groups.map((group, index) => (
				<GroupsListItem
					key={index}
					level={level}
					groupNumber={group.groupId.id}
					onDelete={props.onDelete}
				/>
			))}
		</div>
	);
}

export default GroupsList;
