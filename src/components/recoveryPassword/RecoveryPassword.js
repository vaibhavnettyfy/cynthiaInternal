"use client";
import { LoginBanner, Logo } from "@/helper/constant";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../signup/style.css";
import CommonInput from "../common/Input";
import CommonButton from "../common/Button";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/navigation";
import { errorNotification, successNotification } from "@/helper/Notification";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/Client";
const RecoveryPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [accessToken,setAccessToken] = useState("");

  const validatePassword = (password) => {
    if (password.trim() === "") {
      return "Password cannot be blank.";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    } else {
      return "";
    }
  };



    useEffect(()=>{
      if (typeof window !== 'undefined') {
        const hashParams = window.location.hash.substring(1).split('&');
        const accessTokenParam = hashParams.find(param => param.startsWith('access_token='));
  
        if (accessTokenParam) {
          const accessToken = accessTokenParam.split('=')[1];
          setAccessToken(accessToken);
  
          // Now you can use the access token as needed
          // Make sure to handle token expiration and refresh logic if required
        }else{
          setAccessToken("")
        }
      }
    },[]);

  const passwordHandler = () => {
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
        updatePasswordHandler(newPassword)
      }
    }
  };

  const updatePasswordHandler = async (password) => {
    try {
      if(accessToken !== ""){
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        errorNotification(error.message || "Error changing password");
      } else {
        successNotification("Password updated successfully");
        router.push(`/`)
      }

      }else{
        errorNotification("accessToken is not available please try again")
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
