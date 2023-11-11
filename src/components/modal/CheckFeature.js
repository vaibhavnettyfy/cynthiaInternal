import React from "react";
import { Box, DialogActions, DialogContent, Typography } from "@mui/material";
import CommonButton from "../common/Button";

const CheckFeature = ({ handleClose,modalOpen}) => {
  return (
    <>
      <Box
        width={"450px"}
        height={"220px"}
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
            fontSize={"22px"}
            fontWeight={"700"}
            lineHeight={"30px"}
            marginBottom={2}
          >
            {modalOpen?.data?.message}
          </Typography>
          {/* <CommonButton buttonName="Sign Out" onClick={handleClose} /> */}
        </DialogContent>
      </Box>
    </>
  );
};

export default CheckFeature;
