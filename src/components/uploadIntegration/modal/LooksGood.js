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
import { uploadCsvHandler } from "@/service/upload.service";
import { errorNotification, successNotification } from "@/helper/Notification";
import { EventEmitter } from "@/helper";
const LooksGood = ({
  handleClickStep4,
  handleClickBack3,
  processData,
  file,
  selectedColumn,
}) => {
  const [dataNotFound, setDataNotFound] = useState(false);
  const [selectedColumnData, setSelectedColumnData] = useState([]);

  // to show particular data selected
  useEffect(() => {
    if (selectedColumn && processData[0][selectedColumn]) {
      const selectedData = processData.map((row) => row[selectedColumn]);
      setSelectedColumnData(selectedData);
    } else {
      setDataNotFound(true);
    }
  }, []);

  const csvHandler = async () => {
    const formData = new FormData();
    formData.append("file", file); 
    formData.append("source", "csv");
    const { data, message, success } = await uploadCsvHandler(formData);
    if (success) {
      successNotification(message);
      localStorage.setItem("jobId",data.job_id)
      handleClickStep4();
      EventEmitter.dispatch('jobId',true);
    } else {
      errorNotification(message);
    }
  };

  return (
    <>
      <Box>
        <Stack
          flexDirection={"row"}
          gap={1}
          justifyContent={"center"}
          marginBottom={4}
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
        </Stack>
      </Box>
      <DialogContent sx={{ height: "calc(100% - 155px)", padding: "0" }}>
        <Typography fontSize={"35px"} fontWeight={"700"} lineHeight={"50px"}>
          Looks good?
        </Typography>
        <Typography fontSize={"13px"} color={"#5d5d5b"} lineHeight={"18px"}>
          Please confirm the column. This will be used to generate insights.
        </Typography>
        <Typography
          fontSize={"12px"}
          color={"#860a96"}
          lineHeight={"16px"}
          padding={"15px 0"}
          textAlign={"center"}
        >
          Your file contains {selectedColumnData.length} reviews. This will use{" "}
          {selectedColumnData.length} credits.
        </Typography>
        <Typography
          fontSize={"18px"}
          color={"#030303"}
          fontWeight={"700"}
          lineHeight={"28px"}
        >
          Feedbacks
        </Typography>
        {!dataNotFound && (
          <Box height={"200px"} sx={{ overflowY: "auto" }}>
            {selectedColumnData.slice(0, 5).map((res, i) => {
              let backgroundColor = "#eeeeee";

              if (i === 1 || i === 3 || i === 5) {
                backgroundColor = "#fff";
              }

              return (
                <>
                  <Typography
                    fontSize={"13px"}
                    color={"#000"}
                    lineHeight={"18px"}
                    sx={{ background: backgroundColor, padding: 1 }}
                  >
                    {res}
                  </Typography>
                </>
              );
            })}
          </Box>
        )}
        {dataNotFound && (
          <Box>
            <Typography> Data Not Found </Typography>
          </Box>
        )}
      </DialogContent>
      <Stack flexDirection={"row"} padding={"4px 0 20px"} gap={2}>
        <CommonButton
          buttonName="Back"
          variant="outlined"
          onClick={handleClickBack3}
          fullWidth
        />
        <CommonButton
          buttonName="Continue"
          fullWidth
          onClick={() => csvHandler()}
        />
      </Stack>
    </>
  );
};

export default LooksGood;
