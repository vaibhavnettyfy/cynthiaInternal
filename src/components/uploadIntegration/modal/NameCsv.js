import React, { useEffect, useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import CommonButton from "@/components/common/Button";
import CommonInput from "@/components/common/Input";
import SendIcon from "@mui/icons-material/Send";
const NameCsv = ({ handleClickStep2, handleClickBack1 ,fileNameHandler,fileNameData}) => {
    const [fileName,setFileName] = useState("");
    const [validationError, setValidationError] = useState("");


    const isContinueButtonDisabled = validationError !== "" || fileName.trim() === "";

    const fileHandler = (event) =>{
        setFileName(event.target.value);
        validateFileName(event.target.value);
        fileNameHandler(event.target.value);
    }

    const validateFileName = (name) => {
      if (name.trim() === "") {
        setValidationError("File name cannot be blank.");
      } else {
        setValidationError("");
      }
    };

    useEffect(()=>{
        if(fileNameData){
            setFileName(fileNameData);
        }
    },[]);

  return (
    <>
      <Box>
        <Stack
          flexDirection={"row"}
          gap={1}
          justifyContent={"center"}
          marginBottom={5}
        >
          <Divider
            sx={{
              width: "60px",
              borderWidth: "2px",
              borderRadius: "2px",
              borderColor: "#080a0b",
            }}
          />
          <Divider
            sx={{
              width: "60px",
              borderWidth: "2px",
              borderRadius: "2px",
              borderColor: "#080a0b",
            }}
          />
          <Divider
            sx={{ width: "60px", borderWidth: "2px", borderRadius: "2px" }}
          />
          <Divider
            sx={{ width: "60px", borderWidth: "2px", borderRadius: "2px" }}
          />
          <Divider
            sx={{ width: "60px", borderWidth: "2px", borderRadius: "2px" }}
          />
        </Stack>
      </Box>
      <DialogContent sx={{ height: "calc(100% - 180px)", padding: "0px" }}>
        <Typography
          fontSize={"35px"}
          fontWeight={"700"}
          lineHeight={"50px"}
          marginBottom={2}
        >
          Name your csv file.
        </Typography>
        <Typography fontSize={"13px"} color={"#5d5d5b"} lineHeight={"18px"}>
          Name your CSV file. Date will be automatically added beside the file
          name.
        </Typography>
        {validationError && (
            <Typography color="error" fontSize="12px" marginTop="8px">
              {validationError}
            </Typography>
          )}
        <Box margin={"30px 0"}>
          <CommonInput
            placeholder="Google Forms Survey"
            iconsInput={<SendIcon sx={{ width: "16px", height: "16px" }}  />}
            onChange = {(event) => fileHandler(event)}
            value={fileName}
          />
        </Box>
      </DialogContent>
      <Stack flexDirection={"row"} marginBottom={1} padding={"20px 0"} gap={2}>
        <CommonButton
          buttonName="Back"
          variant="outlined"
          onClick={handleClickBack1}
          fullWidth
        />
        <CommonButton
          buttonName="Continue"
          fullWidth
          disabled={isContinueButtonDisabled}
          onClick={handleClickStep2}
        />
      </Stack>
    </>
  );
};

export default NameCsv;
