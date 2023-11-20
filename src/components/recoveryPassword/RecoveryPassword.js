"use client";
import { LoginBanner, Logo } from "@/helper/constant";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import "../signup/style.css";
import CommonInput from "../common/Input";
import CommonButton from "../common/Button";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { errorNotification, successNotification } from "@/helper/Notification";

const RecoveryPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (password.trim() === "") {
      return "Password cannot be blank.";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    } else {
      return "";
    }
  };

  const passwordHandler = () => {
    console.log("newPassword", newPassword);
    console.log("reEnterPassword", reEnterPassword);
    const newPasswordError = validatePassword(newPassword);
    const reEnterPasswordError = validatePassword(reEnterPassword);

    if (newPasswordError || reEnterPasswordError) {
      // If there are errors, set the error state
      setPasswordError(newPasswordError || reEnterPasswordError);
    } else {
      // Clear the error state if validation passes
      setPasswordError("");
      // Continue with your password handling logic
      if (newPassword !== reEnterPassword) {
        setPasswordError("Password and  Re-enterpassword not match")
        // Handle mismatch error
      }else{
        console.log("newPassword",newPassword);
        console.log("reEnterPassword",reEnterPassword);
        updatePasswordHandler(newPassword)
      }
    }
  };

  const updatePasswordHandler = async (password) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
  
      if (error) {
        console.error("Error updating password:", error);
        errorNotification(error.message || "Error changing password");
      } else {
        successNotification("User password updated successfully");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <Box height={"100vh"}>
      <Grid container height={"100%"} sx={{ overflow: "hidden" }}>
        <Grid item xs={7.5} sx={{ position: "relative", height: "100%" }}>
          <Image src={LoginBanner} className="image" />
          <Box
            sx={{
              position: "absolute",
              top: "0",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "50px",
            }}
          >
            <Typography className="banner_head">Meet Cynthia AI.</Typography>
            <Typography className="banner_para">
              From Customer Feedback to Focused Action Instantly
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={4.5}
          margin={"auto"}
          sx={{ overflow: "auto", height: "100%" }}
        >
          <Stack
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"400px"}
            margin={"auto"}
            padding={"50px 0"}
          >
            <Box>
              <Image src={Logo} className="login_logo" />
            </Box>
            <Box>
              <Typography className="signup_head">Recover Password</Typography>
              <Typography className="signup_para">
                Enter your details to continue
              </Typography>
            </Box>
            <Box width={"100%"}>
              <Stack gap={1}>
                <Box>
                  <CommonInput
                    placeholder="Password"
                    passwordInput
                    name="New Password"
                    inputProps={{ maxLength: 16 }}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </Box>
                <Box>
                  <CommonInput
                    placeholder="Re-enter Password"
                    passwordInput
                    inputProps={{ maxLength: 16 }}
                    onChange={(event) => setReEnterPassword(event.target.value)}
                  />
                </Box>
              </Stack>
              {passwordError && (
                <Typography color="error" variant="body2" align="center">
                  {passwordError}
                </Typography>
              )}

              <Stack padding={"0px 0 16px"} marginY={2}>
                <CommonButton
                  buttonName="reset password"
                  onClick={() => passwordHandler()}
                  //   onClick={() => formik.handleSubmit()}
                  // onClick={() => router.push(`/admin/uploadintegration`)}
                />
              </Stack>
              <Stack padding={"10px 0"}>
                <Typography className="signup_login">
                  I don’t have an account. <Link href="/signup">Sign up</Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecoveryPassword;
