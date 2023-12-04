"use client";
import { Google, LoginBanner, Logo } from "@/helper/constant";
import { Box, Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
import Image from "next/image";
import * as Yup from "yup";
import React from "react";
import "./style.css";
import CommonInput from "../common/Input";
import CommonButton from "../common/Button";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { registerIv } from "@/helper/Formik/intialValues";
import { userRegister } from "@/service/userRegister.service";
import { errorNotification, successNotification } from "@/helper/Notification";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
    position: "relative",
  },
  border: {
    border: "1px solid #6a6a6a",
    opacity: 0.1,
    width: "100%",
  },
  text: {
    fontSize: "1rem",
    fontWeight: "normal",
    backgroundColor: "white",
    padding: "0 16px", // You can adjust this value as needed
    position: "absolute",
  },
}));

const accountType = [
  { name: "individual", value: "individual" },
  {
    name: "organization",
    value: "organization",
  },
];

const SignUp = () => {
  const classes = useStyles();
  const router = useRouter();

  const handleSubmit = async () => {
    const payload = {
      "first_name" : formik.values.firstName,
      "last_name" : formik.values.lastName,
      "email" : formik.values.workEmail,
      "password" : formik.values.password,
      "user_type" : formik.values.accountType,
      "organization_name" : formik.values.company
    }
    const {data,message,success} = await userRegister(payload);
    if(success){
      successNotification("User Signed up successfully");
      router.push(`/login`);
    }else{
      errorNotification(message);
    }
  };

  const registerValidation = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    accountType: Yup.string().required("Account Type is required"),
    company: Yup.string().when('accountType', (accountType, schema) => {
      return accountType[0] === 'organization'
        ? schema.required("Company is required when Account Type is 'organization'")
        : schema;
    }),
    workEmail: Yup.string().matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ).required("Work Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
  });

  const formik = useFormik({
    initialValues: registerIv,
    validationSchema:registerValidation,
    onSubmit: handleSubmit,
  });

  return (
    <Box height={"100vh"}>
      <Grid container height={"100%"} sx={{ overflow: "hidden" }}>
        <Grid item xs={6} sx={{ position: "relative", height: "100%" }}>
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
          xs={6}
          margin={"auto"}
          sx={{ overflow: "auto", height: "100%" }}
        >
          <Stack
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"400px"}
            margin={"auto"}
          >
            <Box>
              <Image src={Logo} className="signup_logo" />
            </Box>
            <Box>
              <Typography className="signup_head">Sign Up</Typography>
              <Typography className="signup_para">
                Enter your Details to Continue
              </Typography>
            </Box>
            <Box width={"100%"}>
              <Stack gap={1} marginBottom={1}>
                <Box>
                  <Stack gap={1} flexDirection={"row"}>
                    <CommonInput placeholder="First Name" name="firstName" formik={formik} inputProps={{ maxLength: 25 }}/>
                    <CommonInput placeholder="Last Name" name="lastName" formik={formik} inputProps={{ maxLength: 25 }}/>
                  </Stack>
                </Box>
                <Stack gap={1} marginY={"0"}>
                  <Box>
                    <CommonInput placeholder="Company" name="company" formik={formik} inputProps={{ maxLength: 30 }}/>
                  </Box>
                  <Box>
                    <Select
                      {...formik.getFieldProps("accountType")}
                      displayEmpty
                      fullWidth
                      sx={{
                        fontSize: { xs: "12px", sm: "16px" },
                        color: "#a4a4a4",
                      }}
                      MenuProps={accountType}
                    >
                      {accountType.map((data, i) => {
                        return (
                          <MenuItem value={data.value}>{data.name}</MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box>
                    <CommonInput
                      placeholder="Work Email"
                      iconsInput
                      name="workEmail"
                      inputProps={{ maxLength: 100 }}
                      formik={formik}
                    />
                  </Box>
                </Stack>
                <Box>
                  <CommonInput
                    placeholder="Password"
                    passwordInput
                    name="password"
                    inputProps={{ maxLength: 50 }}
                    formik={formik}
                  />
                </Box>
              </Stack>
              <Stack padding={"16px 0"}>
                <CommonButton
                  buttonName="Sign Up"
                  onClick = {()=>formik.handleSubmit()}
                />
              </Stack>
              <Stack padding={"10px 0"}>
                <div className={classes.container}>
                  <div className={classes.border}></div>
                  <div className={classes.text}>or</div>
                </div>
              </Stack>
              <Stack padding={"5px 0 10px"} alignItems={"center"}>
                <CommonButton
                  buttonName="Sign up with Google"
                  buttonColor="white"
                  icon={Google}
                  style={{ width: "fit-content", padding: "10px 40px" }}
                />
              </Stack>
              <Stack padding={"10px 0"}>
                <Typography className="signup_login">
                  I already have an account. <Link href="/">Log in</Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
