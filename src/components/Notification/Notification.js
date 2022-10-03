import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Notification(props) {
  return (
    <Snackbar
      open={props.open}
      onClose={props.onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={3000}>
      <Alert severity={props.type} variant="filled">
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
