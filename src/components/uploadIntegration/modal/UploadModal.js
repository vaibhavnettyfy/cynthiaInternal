"use client"
import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import AnalyzFile from "./AnalyzFile";
import NameCsv from "./NameCsv";
import ColumnAnalyse from "./ColumnAnalyse";
import LooksGood from "./LooksGood";
import ProcessFile from "./ProcessFile";
const UploadModal = ({ handleClose ,modalOpen}) => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);

  // for the csv file Data
  const [processData, setProcessData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);
  const [value, setValues] = useState([]);

  // selected Column Value 
  const [selectedColumn,setSelectedColumn] = useState("");   

  // File Name 
  const [fileName,setFileName] = useState("");

  const handleClickStep1 = () => {
    setStep1(false);
    setStep2(true);
  };
  const handleClickStep2 = () => {
    setStep2(false);
    setStep3(true);
  };
  const handleClickStep3 = () => {
    setStep3(false);
    setStep4(true);
  };
  const handleClickStep4 = () => {
    setStep4(false);
    setStep5(true);
  };

  const handleClickBack1 = () => {
    setStep1(true);
    setStep2(false);
  };
  const handleClickBack2 = () => {
    setStep2(true);
    setStep3(false);
  };
  const handleClickBack3 = () => {
    setStep3(true);
    setStep4(false);
  };

  const handleClickBack4 = () => {
    setStep4(true);
    setStep5(false);
  };

  const handleCsvData = (pData, columnData, valuesData) => {
    setProcessData(pData);
    setColumnArray(columnData);
    setValues(valuesData);
  };

  // to handle select column from step-3 
  const selectColumnHandler = (data) =>{
    setSelectedColumn(data);
  }; 


  const fileNameHandler = (data) =>{
    setFileName(data);
  };

  

  return (
    <Box
      width={"420px"}
      height={"640px"}
      sx={{ borderRadius: "24px", padding: "15px 45px 30px" }}
    >
      <DialogTitle sx={{ m: 0, p: 4 }} id="Common_modal">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 10,
            color: "#080a0b",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {step1 && (
        <AnalyzFile
          handleClose={handleClose}
          handleClickStep1={handleClickStep1}
          // we are passing File to this component which from user have selected 
          file={modalOpen.data.file}
          handleCsvData={handleCsvData}
          selectedColumn={selectedColumn}
        />
      )}
      {step2 && (
        <NameCsv
          handleClickStep2={handleClickStep2}
          handleClickBack1={handleClickBack1}
          fileNameHandler={fileNameHandler}
          fileNameData={fileName}
        />
      )}
      {step3 && (
        <ColumnAnalyse
          handleClickBack2={handleClickBack2}
          handleClickStep3={handleClickStep3}
          columnArray={columnArray}
          selectedColumnData={selectedColumn}
          selectColumn={selectColumnHandler}
        />
      )}
      {step4 && (
        <LooksGood
          handleClickBack3={handleClickBack3}
          handleClickStep4={handleClickStep4}
          processData={processData}
          file={modalOpen.data.file}
          selectedColumn={selectedColumn}
        />
      )}
      {step5 && (
        <ProcessFile
          handleClose={handleClose}
          handleClickBack4={handleClickBack4}
        />
      )}
    </Box>
  );
};

export default UploadModal;