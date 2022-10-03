import React from "react";
import studentServices from "services/student/student-services";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function FilesListItemStudent(props) {
  const { file } = props;

  function downloadFile() {
    studentServices
      .getFile(file.name, file.documentType)
      .then((response) => {
        const blob = new Blob([response.data], { type: "octet-stream" });
        const href = URL.createObjectURL(blob);
        const anchor = Object.assign(document.createElement("a"), {
          href,
          style: "display: none",
          download: file.name,
        });
        document.body.append(anchor);
        anchor.click();
        // Cleaning up
        URL.revokeObjectURL(href);
        anchor.remove();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="py-1 px-2 flex items-center shadow border border-slate-300">
      <div
        onClick={downloadFile}
        className="flex items-center gap-5 flex-grow text-blue-700 cursor-pointer">
        <FileDownloadIcon />
        <span>{file.title}</span>
      </div>
    </div>
  );
}

export default FilesListItemStudent;
