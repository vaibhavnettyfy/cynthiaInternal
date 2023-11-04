"use client"
import React, { useState } from 'react'
import { useStyles } from '@/helper/theme';
import { Box, Stack } from '@mui/material'
import CommonButton from '../common/Button';
import CommonModal from '../common/Modal';

const UploadCard = ({ data }) => {
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState({
        open: false,
        currentComponent: "",
        name:''
    });
    return (
        <>
            <Box className={classes.cardContainer}>
                <Stack sx={{ padding: 3 }} alignItems={'center'} gap={2}>
                    {data.image}
                    <CommonButton buttonName={data.button} onClick={() =>
                        setIsModalOpen({
                            open: true,
                            currentComponent: "uploadFile",
                            name:`${data.button}`
                        })} 
                        />
                </Stack>
            </Box>
            <CommonModal
                modalOpen={isModalOpen}
                handleClose={() =>
                    setIsModalOpen({ open: false, currentComponent: "",name:'' })
                } />
        </>
    )
}

export default UploadCard