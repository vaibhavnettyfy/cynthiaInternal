import React from "react";
import { Box, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import CommonButton from "../common/Button";
import { useRouter } from "next/navigation";
import { managePlanHandler } from "@/helper";

const PaymenentPending = ({ handleClose }) => {
  const router = useRouter();

  const signoutHandler = () => {
    router.push(`/`);
    localStorage.clear();
  };

  

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
            Please pay any pending invoices or add a payment method to continue.
          </Typography>
          <Stack gap={1} flexDirection={'row'}>
          <CommonButton
            variant="outlined"
            buttonName="Sign Out"
            onClick={() => signoutHandler()}
            />
          <CommonButton
            buttonName="Manage Your Plan"
            onClick={() => managePlanHandler()}
            />
            </Stack>
        </DialogContent>
      </Box>
    </>
  );
};

export default PaymenentPending;
