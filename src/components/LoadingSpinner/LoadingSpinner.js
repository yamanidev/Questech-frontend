import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingSpinner() {
  return (
    <div className="h-[400px] w-full grid place-items-center absolute">
      <CircularProgress />
    </div>
  );
}

export default LoadingSpinner;
