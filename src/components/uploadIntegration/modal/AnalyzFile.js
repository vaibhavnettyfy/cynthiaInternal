import React from "react";
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
import LinearProgress from "@mui/material/LinearProgress";
import papa from "papaparse";


const AnalyzFile = ({ handleClose, handleClickStep1 ,handleCsvData,selectedColumn}) => {
  const [progress, setProgress] = React.useState(0);
  const [processData,setProcessData] = React.useState([]);
  const [columnArray,setColumnArray] = React.useState([]);
  const [value,setValues] = React.useState([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleChange = (event) =>{
    papa.parse(event.target.files[0],{
        header:true,
        skipEmptyLines : true,
        complete: function(result) {
            const columnArray = [];
            const valuesArray = [];
            
            result.data.map((data) =>{
                columnArray.push(Object.keys(data));
                valuesArray.push(Object.keys(data));
            });
            setProcessData(result.data);
            setColumnArray(columnArray[0]);
            setValues(valuesArray);
            handleCsvData(result.data,columnArray[0],valuesArray);
        }
    });
  }

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
            sx={{ width: "60px", borderWidth: "2px", borderRadius: "2px" }}
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
          Analyzing your file.
        </Typography>
        <Typography fontSize={"13px"} color={"#5d5d5b"} lineHeight={"18px"}>
          Please give us a moment until we analyse the file.
        </Typography>
        <Box margin={"30px 0px"}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: "7px" }}
          />
        </Box>
      </DialogContent>
      <Stack flexDirection={"row"} marginBottom={1} padding={"20px 0"} gap={2}>
        <CommonButton
          buttonName="Back"
          variant="outlined"
          onClick={handleClose}
          fullWidth
        />
        <CommonButton
          buttonName="Continue"
          fullWidth
          onClick={handleClickStep1}
        />
      </Stack>
    </>
  );
};

export default AnalyzFile;
