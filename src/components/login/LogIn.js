"use client";
import { Google, LoginBanner, Logo } from "@/helper/constant";
import { Alert, Box, Checkbox, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../signup/style.css";
import CommonInput from "../common/Input";
import CommonButton from "../common/Button";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/navigation";
import { supabase } from "@/Client";
import { useFormik } from "formik";
import Cookies from "universal-cookie";
import { loginIv } from "@/helper/Formik/intialValues";
import { errorNotification, successNotification } from "@/helper/Notification";
import { subScriptionHandler, subscriptionscheck } from "@/helper/Subscription";
// import { amplitude } from "@/helper/AmplitudeHandler";
import * as amplitude from '@amplitude/analytics-browser';
import moment from "moment";
import EmailIcon from "@mui/icons-material/Email";


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

const LogIn = () => {
  const classes = useStyles();
  const router = useRouter();
  const cookies = new Cookies();
  const [rememberMe, setRememberMe] = useState(false);
  const [isActive, setIsActive] = useState("Not Defiend");
  const amplitudekey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
  amplitude.init(amplitudekey, {defaultTracking: true});

  // to fetch data from cookie while login screen
  useEffect(() => {
    const cookies = new Cookies();
    const userEmail = cookies.get("userEmail");
    const userPassword = cookies.get("userPassword");
    if (userEmail && userPassword) {
      setRememberMe(true);
      formik.setValues({
        ...formik.values,
        email: userEmail,
        password: userPassword,
      });
    }
  }, []);

  useEffect(()=>{
    let accessToken = "";
    let isActiveFlag = "";
    accessToken = localStorage.getItem("accessToken");
    isActiveFlag = localStorage.getItem("activeCheck");
    
    if(accessToken && isActiveFlag === "true"){
      router.push(`/admin/uploadintegration`)
    }
  },[])

  // for the user Login
  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formik.values.email,
        password: formik.values.password,
      });
      if (error) {
        errorNotification(error.message || "Something went wrong");
      } else {
        if (typeof window !== 'undefined') {
        localStorage.setItem("accessToken", data.session.access_token);
        localStorage.setItem("userId",data.user.id);
        localStorage.setItem("userRole", data.user.app_metadata.user_role);
        localStorage.setItem(
          "orgId",
          data.session.user.app_metadata.organization_id
        );
        localStorage.setItem("userEmail",formik.values.email)
        localStorage.setItem("userPassword",formik.values.password)
        }
        const activeCheck = data.session.user.app_metadata.is_active;

        localStorage.setItem("activeCheck",activeCheck);

        const eventpayload = {
          login_method:"Email",
          logged_in_at:Math.floor(Date.now() / 1000) 
        }
        amplitude.track("Logged In",eventpayload)
        amplitude.setUserId(data.user.id);
        if(activeCheck != "false"){
          setIsActive("true");
        }else{
          setIsActive("false");
        }
        // setIsActive();
        // localStorage.setItem("orgId",data.user.user_metadata.organization_id)
        // const orgId = data.user.user_metadata.organization_id;
        // const userId = data.session.user.id;
        // const role = data.user.user_metadata.role;
        if (rememberMe) {
          cookies.set("userEmail", formik.values.email);
          cookies.set("userPassword", formik.values.password);
        } else {
          cookies.remove("userEmail");
          cookies.remove("userPassword");
        }
        if(data.session.user.app_metadata.is_active != "false"){
          successNotification("Login");
          router.push(`/admin/uploadintegration`);
        }
      }
    } catch (error) {
      errorNotification(error.message || "Something went wrong");
    }
  };

  const resetPasswordHandler = () =>{
    router.push(`/recoveryEmail`);
    localStorage.clear();
  }

  // to handle rember me
  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const formik = useFormik({
    initialValues: loginIv,
    onSubmit: handleSubmit,
  });

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
              <Typography className="signup_head">Log in</Typography>
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
                    formik={formik}
                    inputProps={{ maxLength: 100 }}
                iconsInput={
                  <EmailIcon sx={{ width: "16px", height: "16px" }} />
                }
                  />
                </Box>
                <Box>
                  <CommonInput
                    placeholder=""
                    labelInput
                    name="password"
                    labal="Enter your password"
                    formik={formik}
                    inputProps={{ maxLength: 50 }}
                    passwordInput
                  />
                </Box>
              </Stack>
              <Stack marginY={2}>
                <Grid container sx={{ justifyContent: "space-between" }}>
                  <Grid item sx={6}>
                    <Grid container sx={{ alignItems: "center" }}>
                      <Grid item sx={6}>
                        <Checkbox
                          // defaultChecked
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                          sx={{
                            padding: "0",
                            color: "#7a52f4",
                            "& .MuiSvgIcon-root": { fontSize: 20 },
                            "&.Mui-checked": {
                              color: "#7a52f4",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item sx={6}>
                        <Typography
                          fontSize={"14px"}
                          fontWeight={500}
                          marginLeft={1}
                        >
                          Remember me
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={6} className="login_para">
                    <Link href="/recoveryEmail" onClick={()=>resetPasswordHandler()}>
                      <Typography
                        fontSize={"14px"}
                        fontWeight={500}
                        marginLeft={1}
                      >
                        Recover Password
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Stack>
              <Stack padding={"0px 0 16px"}>
                <CommonButton
                  buttonName="Log in"
                  onClick={() => formik.handleSubmit()}
                  // onClick={() => router.push(`/admin/uploadintegration`)}
                />
              </Stack>
              {
                isActive == "false" && 
                <Stack padding={"0px 0 16px"}>
                  <Alert severity="error">
                    Your status is not active — check it out!
                  </Alert>
                </Stack>
              }
              <Stack padding={"16px 0"}>
                <div className={classes.container}>
                  <div className={classes.border}></div>
                  <div className={classes.text}>or</div>
                </div>
              </Stack>
              <Stack padding={"5px 0 16px"} alignItems={"center"}>
                <CommonButton
                  buttonName="Login with Google"
                  buttonColor="white"
                  icon={Google}
                  onClick={() => alert('Logging in with Google is currently unavailable!')} //{loginWithGoogle}
                  style={{ width: "fit-content", padding: "10px 40px" }}
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

export default LogIn;
