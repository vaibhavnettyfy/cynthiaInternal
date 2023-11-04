import React, { useEffect } from "react";
import { DialogContent, Box, Typography, Stack, Divider } from "@mui/material";
import CommonButton from "@/components/common/Button";
import CircularProgress from "@mui/material/CircularProgress";
const ProcessFile = ({
  handleClose,
  handleClickBack4,
  file,
  selectedColumn,
}) => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
        </Stack>
      </Box>
      <DialogContent sx={{ height: "calc(100% - 180px)", padding: "0" }}>
        <Typography fontSize={"35px"} fontWeight={"700"} lineHeight={"50px"}>
          Processing your file.
        </Typography>
        <Typography fontSize={"13px"} color={"#5d5d5b"} lineHeight={"18px"}>
          Your file is being processed. It might take anywhere between 5 mins to
          15 mins depending on how many reviews are included.
        </Typography>
        <Box margin={"25px 0px"} sx={{ textAlign: "center" }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{ width: "120px !important", height: "120px !important" }}
          />
        </Box>
        <Typography
          textAlign={"center"}
          fontSize={"13px"}
          fontWeight={"700"}
          lineHeight={"24px"}
        >
          We will send you an email once it’s processed.
        </Typography>
      </DialogContent>
      <Stack
        flexDirection={"row"}
        padding={"20px 0 10px"}
        gap={2}
        justifyContent={"center"}
      >
        <CommonButton
          buttonName="Done"
          onClick={handleClose}
          style={{ padding: "10px 40px" }}
        />
      </Stack>
    </>
  );
};

export default ProcessFile;
