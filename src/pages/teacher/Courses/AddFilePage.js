import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import addFileSVG from "~/assets/add-file.svg";
import teacherServices from "~/services/teacher/teacher-services";

function AddFilePage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [fileSelected, setFileSelected] = useState(false);

  const { codeName } = useParams();

  const navigate = useNavigate();

  const formData = useRef(new FormData());

  function onFileChange(event) {
    const file = event.target.files[0];
    formData.current.append("file", file);
    setFileSelected(true);
  }

  function validateFields() {
    return title && type && fileSelected;
  }

  function addFile() {
    teacherServices
      .addFile(codeName, title, type, formData.current)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1 className="mb-10 text-6xl font-semibold">Add New File</h1>
      <div className="flex flex-col xl:flex-row items-center xl:items-start gap-20 xl:gap-80">
        <div className="pl-10 pt-10 xl:pt-20 flex flex-col gap-3">
          <div className="max-w-md flex gap-4">
            <TextField
              fullWidth
              label="Title"
              onChange={(event) => {
                setTitle(encodeURIComponent(event.target.value.trim()));
              }}
            />
          </div>
          <div className="max-w-md flex gap-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={(event) => {
                  setType(event.target.value);
                }}>
                <MenuItem value="COURSE">Lesson</MenuItem>
                <MenuItem value="TD">TD</MenuItem>
                <MenuItem value="TP">TP</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="max-w-md">
            <input type="file" name="file_upload" id="upload-button" onChange={onFileChange} />
          </div>
          <Stack spacing={2} direction="row" marginTop={5}>
            <Button
              variant="contained"
              color="error"
              component={Link}
              to={`/teacher/course/${codeName}`}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                addFile();
                navigate(`/teacher/course/${codeName}`);
              }}
              disabled={!validateFields()}>
              Upload
            </Button>
          </Stack>
        </div>
        <img src={addFileSVG} alt="" />
      </div>
    </div>
  );
}

export default AddFilePage;
