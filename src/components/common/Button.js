import React from "react";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import Image from "next/image";

const CommonButton = (props) => {
  const {
    onClick,
    buttonName,
    buttonColor,
    fullWidth,
    style,
    icon,
    variant,
    className,
    size,
    startIcon = "",
    iconWidth,
    muiIcon,
    type,
    uploadfile,
    disabled,
    loading,
    loader,
    accept,
    endIcon = "",
    ...other
  } = props;
  return (
    <>
      <Button
        variant={variant ? variant : "contained"}
        color={buttonColor}
        onClick={onClick}
        fullWidth={fullWidth}
        sx={style}
        className={className}
        startIcon={startIcon}
        endIcon={endIcon}
        type={type}
        disabled={disabled}
        size={size || "medium"}
        {...other}
      >
        <Stack gap={1} flexDirection={"row"} alignItems={"center"}>
          {icon && (
            <Box margin={"auto"}>
              <Image
                src={icon}
                style={{ display: "flex" }}
                width={iconWidth ? iconWidth : 15}
              />
            </Box>
          )}
          {muiIcon && (
            <Box margin={"auto"} height={"20px"}>
              {muiIcon}
            </Box>
          )}
          {uploadfile && (
            <input type="file" className="input_upload_file" accept={accept} />
          )}
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            buttonName && (
              <Box
                margin={"auto"}
                sx={{ fontSize: { md: "12px", lg: "13px", xl: "14px" } }}
              >
                {buttonName}
              </Box>
            )
          )}
        </Stack>
      </Button>
    </>
  );
};

export default CommonButton;
