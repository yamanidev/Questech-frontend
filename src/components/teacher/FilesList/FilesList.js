import React from "react";
import FileListItem from "./FilesListItem";

function FilesList(props) {
	const { title, files, onConfirmDelete } = props;
	return (
		<div>
			<h4 className="mb-5 text-3xl font-semibold">{title}</h4>
			<div className="w-full max-w-xl flex pl-10 flex-col gap-2">
				{files.map((file, index) => (
					<FileListItem key={index} file={file} onConfirmDelete={onConfirmDelete} />
				))}
			</div>
		</div>
	);
}

export default FilesList;
