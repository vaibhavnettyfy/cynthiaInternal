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
import { supabase } from "@/Client";
import { errorNotification, successNotification } from "@/helper/Notification";

const RecoveryEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetEmailHandler = async () => {
    // if (!email.trim()) {
    //   setError("Email cannot be blank");
    // } else {
    //   setError("");
    // //   const {data,error} = await supabase.auth.resetPasswordForEmail(email,{
    // //     redirectTo:'https://cynthia-dev.vercel.app/recoveryPassword'
    // //   })
    // //   console.log("data", data);
    // //   console.log("error",error);
    // console.log("email",email);
    //   // Add logic for password reset here
    // }
    if (!email.trim()) {
      setError("Email cannot be blank");
    } else if (!validateEmail(email)) {
      setError("Enter a valid email address");
    } else {
      setError("");
      console.log("email", email);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://cynthia-dev.vercel.app/recoveryPassword",
      });
      if(!error){
        successNotification("recovery password mail sent successfully")
      }else{
        errorNotification("something_went_wrong");
      }
      console.log("data", data);
      console.log("error", error);
      // Add logic for password reset here
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
                    placeholder=""
                    labelInput
                    name="email"
                    labal="Enter your email"
                    onChange={(event) => setEmail(event.target.value)}
                    inputProps={{ maxLength: 30 }}
                    iconsInput
                  />
                </Box>
                {error && (
                  <Typography color="error" className="validation-error">
                    {error}
                  </Typography>
                )}
              </Stack>

              <Stack padding={"0px 0 16px"} marginY={2}>
                <CommonButton
                  buttonName="reset password"
                  onClick={() => resetEmailHandler()}
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

export default RecoveryEmail;
