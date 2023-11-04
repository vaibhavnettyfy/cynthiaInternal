import React, { useEffect, useState } from 'react'
import { DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CommonButton from '../common/Button'
import { supabase } from '@/Client';
import { errorNotification, successNotification } from '@/helper/Notification';
const Remove = ({ handleClose ,modalOpen }) => {
    const {data} = modalOpen;

    const [fileName, setFileName] = useState(null);
    const [fileid,setFileId] = useState(null);

  useEffect(() => {
    setFileName(data.fileName);
    setFileId(data.fileId);
  }, []);


    const removeFileHandler = async () => {
        try {
          const { data, error } = await supabase
            .from("csv_files")
            .delete()
            .eq("id", fileid);
          if (error) {
            errorNotification(error.message);
          } else {
            successNotification("Record deleted successfully");
            handleClose();
          }
        } catch (error) {
          errorNotification(error.message);
        }
      };

    return (
        <div>
            <DialogTitle sx={{ m: 0, p: 2 }} id="Common_modal">
                Remove
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Typography>Do you want to Remove this File? </Typography>
            </DialogContent>
            <DialogActions>
                <CommonButton buttonName='Cancel' variant='outlined' onClick={handleClose} />
                <CommonButton buttonName='Remove' onClick={removeFileHandler}/>
            </DialogActions>
        </div>
    )
}

export default Remove