import { Box, DialogContent, Stack, Typography } from "@mui/material";
import React from "react";
import CommonButton from "../common/Button";

function CommingSoon({ handleClose }) {
  return (
    <Box
      width={"450px"}
      height={"260px"}
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
          fontSize={"25px"}
          fontWeight={"700"}
          lineHeight={"25px"}
          marginBottom={2}
        >
          Coming Soon
        </Typography>

        <Stack sx={{
          alignItems: "center",
          justifyItems: "center",
        }}>
          <Typography
            fontSize={"18px"}
            fontWeight={"500"}
            lineHeight={"25px"}
            marginBottom={2}
          >
            We're working on this.you will be notified when it is available Stay
            tuned !
          </Typography>
          <CommonButton buttonName="Okay" onClick={() => handleClose()} style={{ borderRadius: "3px", padding: "8px" }}/>
        </Stack>
      </DialogContent>
    </Box>
  );
}

export default CommingSoon;
