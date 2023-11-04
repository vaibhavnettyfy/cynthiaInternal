import React, { useState } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import CommonInput from "@/components/common/Input";
import CommonButton from "@/components/common/Button";
import Link from "next/link";
import { useFormik } from "formik";
import { changePasswordIv } from "@/helper/Formik/intialValues";
import { changePasswordValidation } from "@/helper/Formik/validation";
import { supabase } from "@/Client";
import { errorNotification, successNotification } from "@/helper/Notification";

const Password = () => {
  const [passwordError, setPasswordError] = useState("");

  const updatePasswordHandler = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: formik.values.newPassword,
      });
  
      if (error) {
        console.error("Error updating password:", error);
        errorNotification(error.message || "Error changing password");
      } else {
        successNotification("User password updated successfully");
        formik.resetForm();
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleSubmit = () => {
    if (formik.values.newPassword !== formik.values.reEnterPassword) {
      setPasswordError("Password and  Re-enterpassword do not match");
    } else {
      setPasswordError("");
      updatePasswordHandler()
    }
  };

  const formik = useFormik({
    initialValues: changePasswordIv,
    validationSchema: changePasswordValidation,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <Typography
        fontSize={"30px"}
        fontWeight={"600"}
        lineHeight={"30px"}
        marginBottom={2}
        marginLeft={3}
      >
        Password
      </Typography>
      <Divider />
      <Box padding={5}>
        <Stack
          flexDirection={"row"}
          gap={3}
          alignItems={"center"}
          paddingY={3}
          marginLeft={2}
        >
          <Typography
            fontSize={"15px"}
            fontWeight={"600"}
            lineHeight={"25px"}
            width={"220px"}
          >
            Old Password
          </Typography>
          <CommonInput
            passwordInput
            style={{ width: "400px" }}
            name="password"
            formik={formik}
            inputProps={{ maxLength: 16 }}
          />
        </Stack>
        <Divider />
        <Stack
          flexDirection={"row"}
          gap={3}
          alignItems={"center"}
          paddingY={3}
          marginLeft={2}
        >
          <Typography
            fontSize={"15px"}
            fontWeight={"600"}
            lineHeight={"25px"}
            width={"220px"}
          >
            New Password
          </Typography>
          <CommonInput
            passwordInput
            style={{ width: "400px" }}
            name="newPassword"
            formik={formik}
            inputProps={{ maxLength: 16 }}
          />
        </Stack>
        <Divider />
        <Stack
          flexDirection={"row"}
          gap={3}
          alignItems={"center"}
          paddingY={3}
          marginLeft={2}
        >
          <Typography
            fontSize={"15px"}
            fontWeight={"600"}
            lineHeight={"25px"}
            width={"220px"}
          >
            Re-enter Password
          </Typography>
          <CommonInput
            passwordInput
            style={{ width: "400px" }}
            name="reEnterPassword"
            formik={formik}
            inputProps={{ maxLength: 16 }}
          />
        </Stack>
        {passwordError && (
          <Grid item xs={12}>
            <Typography color="error">{passwordError}</Typography>
          </Grid>
        )}
        <Stack
          flexDirection={"row"}
          gap={3}
          marginLeft={"100px"}
          marginTop={3}
          alignItems={"center"}
        >
          <CommonButton
            buttonName="Change Password"
            style={{ borderRadius: "3px" }}
            onClick={() => formik.handleSubmit()}
          />
          <Typography fontWeight={"500"} fontSize={"13px"}>
            <Link href="#" style={{ marginLeft: "10px" }}>
              I forgot my password!
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Password;
