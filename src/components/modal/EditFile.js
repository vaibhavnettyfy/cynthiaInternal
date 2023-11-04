import React, { use, useEffect, useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonButton from "../common/Button";
import CommonInput from "../common/Input";
import { supabase } from "@/Client";
import { errorNotification, successNotification } from "@/helper/Notification";
const EditFile = ({ handleClose, modalOpen }) => {
  const { data } = modalOpen;

  const [fileName, setFileName] = useState(null);
  const [fileid, setFileId] = useState(null);

  useEffect(() => {
    setFileName(data.fileName);
    setFileId(data.fileId);
  }, []);

  const fileNameHandler = async () => {
    try {
      const updateData = {
        original_filename: fileName,
      };
      const { error } = await supabase
        .from("csv_files")
        .update(updateData)
        .eq("id", fileid);
      if (error) {
        errorNotification(error.message);
      } else {
        successNotification("Record update successfully");
        handleClose();
      }
    } catch (err) {
      errorNotification(err.message);
    }
  };

  return (
    <div>
      <DialogTitle sx={{ m: 0, p: 2 }} id="Common_modal">
        Edit File
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <CommonInput
          placeholder="File Name"
          value={fileName}
          labelInput
          labal="File Name"
          onChange={(event) => setFileName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <CommonButton
          buttonName="Cancel"
          variant="outlined"
          onClick={handleClose}
        />
        <CommonButton buttonName="Save" onClick={fileNameHandler} />
      </DialogActions>
    </div>
  );
};

export default EditFile;
