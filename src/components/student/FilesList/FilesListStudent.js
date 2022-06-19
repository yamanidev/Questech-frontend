import React from "react";
import FilesListItemStudent from "./FilesListItemStudent";

function FilesListStudent(props) {
	const { title, files, onConfirmDelete } = props;
	return (
		<div>
			<h4 className="mb-5 text-3xl font-semibold">{title}</h4>
			<div className="w-full max-w-xl flex pl-10 flex-col gap-2">
				{files.map((file, index) => (
					<FilesListItemStudent
						key={index}
						file={file}
						onConfirmDelete={onConfirmDelete}
					/>
				))}
			</div>
		</div>
	);
}

export default FilesListStudent;
