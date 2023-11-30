import React, { useEffect, useState } from "react";
import {
    Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonButton from "../common/Button";
import { supabase } from "@/Client";
import { errorNotification, successNotification } from "@/helper/Notification";
import { managePlanHandler } from "@/helper";
const Usage = ({ handleClose, modalOpen }) => {
  // const {data} = modalOpen;

  // const [fileName, setFileName] = useState(null);
  // const [fileid,setFileId] = useState(null);

  //   useEffect(() => {
  //     setFileName(data.fileName);
  //     setFileId(data.fileId);
  //   }, []);

  // const removeFileHandler = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from("csv_files")
  //         .delete()
  //         .eq("id", fileid);
  //       if (error) {
  //         errorNotification(error.message);
  //       } else {
  //         successNotification("Record deleted successfully");
  //         handleClose();
  //       }
  //     } catch (error) {
  //       errorNotification(error.message);
  //     }
  //   };

  return (
    <div>
      <Box
        width={"450px"}
        height={"180px"}
        sx={{ borderRadius: "24px", padding: "30px" }}
      >
        <DialogContent
          sx={{
            height: "100%",
            padding: "0px",
            textAlign: "center",
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            fontSize={"20px"}
            fontWeight={"700"}
            lineHeight={"30px"}
            marginBottom={2}
          >
            Usage based in disabled when on trial. Please <span style={{color:"#700f70",cursor:"pointer"}} onClick={()=>managePlanHandler()}>upgrade your plan</span> 
          </Typography>
          <CommonButton
            buttonName="Cancel"
            variant="outlined"
            onClick={handleClose}
          />
        </DialogContent>
      </Box>
    </div>
  );
};

export default Usage;
