import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import teacherServices from "~/services/teacher/teacher-services";

function FileListItem(props) {
  const { file, onConfirmDelete } = props;

  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  function downloadFile() {
    teacherServices
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
    <>
      <div className="py-1 px-2 flex items-center shadow border border-slate-300">
        <div
          onClick={downloadFile}
          className="flex items-center gap-5 flex-grow text-blue-700 cursor-pointer">
          <FileDownloadIcon />
          <span>{file.title}</span>
        </div>
        <IconButton
          onClick={() => {
            setDeleteModalOpened(true);
          }}>
          <DeleteIcon />
        </IconButton>
      </div>
      {/* Confirming clear, should be using Dialog instead I think */}
      <Modal
        open={deleteModalOpened}
        onClose={() => {
          setDeleteModalOpened(false);
        }}>
        <div className="w-[25rem] h-[25rem] p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg">
          <Stack height="100%">
            <Typography
              variant="h4"
              sx={{ fontWeight: "900", textAlign: "center", marginBottom: "4rem" }}>
              Delete file
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", textAlign: "center" }}>
              Are you sure you want to delete this file?
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2} marginTop={5}>
              <Button
                variant="contained"
                onClick={() => {
                  onConfirmDelete(file.id, file.documentType);
                  setDeleteModalOpened(false);
                }}>
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setDeleteModalOpened(false);
                }}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </div>
      </Modal>
    </>
  );
}

export default FileListItem;
