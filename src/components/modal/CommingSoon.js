import { Box, DialogContent, Stack, Typography } from "@mui/material";
import React from "react";
import CommonButton from "../common/Button";

function CommingSoon() {
  return (
    <Box
        width={"450px"}
        height={"200px"}
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
            fontSize={"16px"}
            fontWeight={"500"}
            lineHeight={"25px"}
            marginBottom={2}
          >
            Comming Soon
          </Typography>
          
        </DialogContent>
      </Box>
  );
}

export default CommingSoon;
