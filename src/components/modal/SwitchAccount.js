import { Box, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import CommonButton from "../common/Button";
import React from "react";
import { useRouter } from "next/navigation";
import CommonModal from "../common/Modal";

const SwitchAccount = ({ handleClose }) => {
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
          <Typography fontSize={"30px"} fontWeight={"700"} lineHeight={"40px"}>
            Are you sure?
          </Typography>
          <Typography
            fontSize={"16px"}
            fontWeight={"500"}
            lineHeight={"25px"}
            marginBottom={2}
          >
            Your account type will switch to individual and you will have to
            relogin.
          </Typography>
          <Stack flexDirection={"row"} gap={"10px"}>
            <CommonButton buttonName="Confirm" onClick={handleClose} />
            <CommonButton buttonName="Cancel" onClick={handleClose} />
          </Stack>
        </DialogContent>
      </Box>
    </>
  );
};

export default SwitchAccount;
