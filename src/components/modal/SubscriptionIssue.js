import React from "react";
import { Box, DialogActions, DialogContent, Typography } from "@mui/material";
import CommonButton from "../common/Button";
import { useRouter } from "next/navigation";

const SubscriptionIssue = ({ handleClose }) => {
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
            There is an issue with your subscription. Please contact admin your
            admin
          </Typography>
          <CommonButton buttonName="Sign Out" onClick={() => signoutHandler()} />
        </DialogContent>
      </Box>
    </>
  );
};

export default SubscriptionIssue;
