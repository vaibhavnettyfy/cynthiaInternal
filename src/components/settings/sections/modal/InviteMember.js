import React, { useState } from "react";
import {
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Typography,
  Stack,
  Divider,
  TextareaAutosize,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonButton from "@/components/common/Button";
import CommonInput from "@/components/common/Input";
import CommonSelect from "@/components/common/Select";
import { styled } from "@mui/system";
const selectList = [{ name: "US", value: "us" }];

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ;
    background: ;
    border: 1px solid #e3e3e3;
    box-shadow: unset ;

    &:hover {
        border-color: 1px solid #7a52f4;
    }

    &:focus {
      border-color: 1px solid #7a52f4;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const InviteMember = ({ handleClose }) => {
  const [emails,setEmails] = useState("");
  return (
    <Box width={"480px"} sx={{ borderRadius: "10px" }}>
      <DialogContent>
        <Typography
          fontSize={"25px"}
          fontWeight={"600"}
          lineHeight={"30px"}
          marginBottom={1}
        >
          Invite Your Team
        </Typography>
        <Typography fontSize={"14px"} fontWeight={"400"} lineHeight={"20px"}>
          Enter upto 10 email addresses seperated by comma (,).
        </Typography>
        <Stack
          flexDirection={"row"}
          gap={2}
          marginTop={4}
          justifyContent={"center"}
        >
          <StyledTextarea aria-label="minimum height" minRows={3} value={emails} onChange={(e)=>setEmails(e.target.value)} />
        </Stack>
      </DialogContent>
      <Stack
        flexDirection={"row"}
        padding={3}
        gap={2}
        justifyContent={"flex-end"}
      >
        <CommonButton
          buttonName="Send Invites"
          onClick={handleClose}
          style={{ borderRadius: "5px" }}
        />
        <CommonButton
          buttonName="Cancel"
          variant="outlined"
          onClick={handleClose}
          style={{ borderRadius: "5px" }}
        />
      </Stack>
    </Box>
  );
};

export default InviteMember;
