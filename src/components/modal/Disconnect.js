import React, { useEffect, useState } from "react";
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
import { supabase } from "@/Client";
import { errorNotification, successNotification } from "@/helper/Notification";
import { EventEmitter } from "@/helper";
const Disconnect = ({ handleClose, modalOpen }) => {
  const { data } = modalOpen;

  console.log("data", data);

  const disconnectHandler = async () => {
    try {
        const { data, error } = await supabase
          .from("integrations")
          .delete()
          .eq("id", modalOpen.data.id);
    
        if (!error) {
            EventEmitter.dispatch('disconnected',true);
            handleClose();
        } else {
          throw new Error(error.message);
        }
      } catch (error) {
        errorNotification(error.message);
      }
  };

  return (
    <div>
      <DialogTitle sx={{ m: 0, p: 2 }} id="Common_modal">
        Disconnect
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
        <Typography>Are you sure?</Typography>
        <Typography
          fontSize={"16px"}
          fontWeight={"500"}
          lineHeight={"25px"}
          marginBottom={2}
        >
          This will delete all the data pertaining to this app?
        </Typography>
      </DialogContent>
      <DialogActions>
        <CommonButton
          buttonName="Cancel"
          variant="outlined"
          onClick={handleClose}
        />
        <CommonButton buttonName="Sure" onClick={() => disconnectHandler()} />
      </DialogActions>
    </div>
  );
};

export default Disconnect;
