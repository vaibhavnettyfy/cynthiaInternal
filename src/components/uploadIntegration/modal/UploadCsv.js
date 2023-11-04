import CommonButton from "@/components/common/Button";
import { errorNotification } from "@/helper/Notification";
import {
  Button,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import papa from "papaparse";

function UploadCsv({ handleClose, handleClickBack1, fileHandler ,handleCsvData}) {
  const [files, setFiles] = useState(null);

  const handleFileChange = (event) => {
    papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(result) {
        const columnArray = [];
        const valuesArray = [];
        
        result.data.map((data) =>{
            columnArray.push(Object.keys(data));
            valuesArray.push(Object.keys(data));
        });
        handleCsvData(result.data,columnArray[0],valuesArray);
    }
    });
    setFiles(event.target.files[0]);
    fileHandler(event.target.files[0]);
    
  };
  
  const deleteCsvHandler = () =>{
    setFiles(null);
  };

  return (
    <>
      <DialogContent sx={{ height: "calc(100% - 140px)", padding: "0px" }}>
        <Typography
          fontSize={"35px"}
          fontWeight={"700"}
          lineHeight={"50px"}
          marginBottom={2}
        >
          Upload your csv file.
        </Typography>
        <input
        type="file"
        accept=".csv"
        onChange={(event)=>handleFileChange(event)}
        style={{ display: 'none' }}
        id="file-upload-input"
      />
      <label htmlFor="file-upload-input">
        <Button variant="contained" color="primary" component="span">
          Select CSV File
        </Button>
      </label>

      {
        files && <Typography> {files.name}</Typography>
      }
      <Button onClick={()=>deleteCsvHandler()}> delete  </Button>
      </DialogContent>
      <Stack flexDirection={"row"} marginBottom={1} padding={"20px 0"} gap={2}>
        <CommonButton
          buttonName="Cancel"
          variant="outlined"
          onClick={handleClose}
          fullWidth
        />
        <CommonButton
          buttonName="Continue"
          fullWidth
          disabled={!files}
          onClick={handleClickBack1}
        />
      </Stack>
    </>
  );
}

export default UploadCsv;
