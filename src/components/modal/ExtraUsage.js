import {
  Box,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import CommonButton from "../common/Button";
import React from "react";
import { errorNotification } from "@/helper/Notification";

const ExtraUsage = ({ handleClose }) => {
  return (
    <>
      <Box
        width={"450px"}
        height={"265px"}
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
            Please enabled usage-based pricing for extra usage.Additional usage
            will be charged as per your plan.
          </Typography>
          <Stack flexDirection={"row"} gap={"10px"}>
            <CommonButton buttonName="cancel" onClick={handleClose} />
            <CommonButton
              buttonName="ENABLE"
              onClick={() =>
                errorNotification(
                  "Usage-based pricing is enabled. You will be charged additionally for extra usage based on your plan. You may disable it in the usage settings"
                )
              }
            />
          </Stack>
        </DialogContent>
      </Box>
    </>
  );
};

//   export default SwitchAccount;

export default ExtraUsage;
