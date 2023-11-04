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
  Select,
  MenuItem,
} from "@mui/material";
import CommonButton from "@/components/common/Button";
import CommonSelect from "@/components/common/Select";

const selectList = [{ name: "Feedbacks 1", value: "feedbacks1" }];

const ColumnAnalyse = ({ handleClickStep3, handleClickBack2, columnArray,selectColumn ,selectedColumnData }) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [columData, setColumnData] = useState([]);

  useEffect(() => {
    setColumnData(columnArray);
  }, []);

  useEffect(()=>{
    if(selectedColumnData){
      setSelectedColumn(selectedColumnData);
    }
  },[]);

  const handleColumnSelect = (event) =>{
    // to pass which column selected to parents
    selectColumn(event.target.value);
    setSelectedColumn(event.target.value);
  };

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
          Select column to analyse.
        </Typography>
        <Typography fontSize={"13px"} color={"#5d5d5b"} lineHeight={"18px"}>
          We will analyse and generate actionable insights for the selected
          column, Feedbacks.
        </Typography>
        <Box margin={"30px 0"}>
          {/* <CommonSelect selectHead="select" selectList={columData} /> */}
          <Select
            displayEmpty
            fullWidth
            sx={{ fontSize: { xs: "12px", sm: "16px" }, color: "#a4a4a4" }}
            MenuProps={columData}
            value={selectedColumn}
            onChange={handleColumnSelect}
          >
            { 
                columData?.map((data,i) =>{
                    return (
                        <MenuItem value={data}> {data} </MenuItem>
                    )
                })
            }
          </Select>
        </Box>
      </DialogContent>
      <Stack flexDirection={"row"} marginBottom={1} padding={"20px 0"} gap={2}>
        <CommonButton
          buttonName="Back"
          variant="outlined"
          onClick={handleClickBack2}
          fullWidth
        />
        <CommonButton
          buttonName="Continue"
          fullWidth
          onClick={handleClickStep3}
        />
      </Stack>
    </>
  );
};

export default ColumnAnalyse;
