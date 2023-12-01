"use client";
import React, { useEffect, useState } from "react";
import { useStyles } from "@/helper/theme";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import CommonButton from "../common/Button";
import CommonModal from "../common/Modal";
import { errorNotification, successNotification } from "@/helper/Notification";
import { supabase } from "@/Client";
import { EventEmitter } from "@/helper";
import { circularProgressClasses } from "@mui/material/CircularProgress";

const UploadCard = ({ data }) => {
  const classes = useStyles();

  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    currentComponent: "",
    name: "",
    data: {
      fileName: "",
      file: "",
    },
  });
  const [statusDetails, setStatusDetails] = useState({});
  const [playStoreDetails, setPlayStoreDetails] = useState({});
  const [appStoreDetails, setAppStoreDetails] = useState({});

  EventEmitter.subscribe("jobId", (res) => {
    getStatusByJobId();
  });

  EventEmitter.subscribe('appIntegrations', (res) => {
    playStoreHandler();
    appStoreHandler();
  })

  let userId = "";
  let orgId = "";
  let userRole = "";

  if (typeof window !== "undefined") {
    userRole = localStorage.getItem("userRole");
    userId = localStorage.getItem("userId");
    orgId = localStorage.getItem("orgId");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      getStatusByJobId();
    }

    // For the real Time
    const subscription = supabase
      .channel("jobs").on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
      }, (payload) => [
        EventEmitter.dispatch("jobId", true)])
      .subscribe();

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();
  }, []);

  // for the app store and playStore
  useEffect(() => {
    playStoreHandler();
  }, []);

  useEffect(() => {
    appStoreHandler();
  }, []);

  const getStatusByJobId = async () => {
    try {
      const JOBID = localStorage.getItem("jobId");
      if (JOBID) {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("job_id", JOBID);
          console.log("data-job_id",data);
        if (!error) {
          // if(data[0].status === "failed"){
          //   errorNotification("failed")
          // }
          // if(data[0].status === "complete"){
          //   successNotification("complete")
          // }
          if (data[0]) {
            setStatusDetails(data[0]);
          } else {
            console.log("data not Found");
          }
        }
      }
    } catch (err) {
      console.error("An error occurred:", err.message);
      // Handle the error, log it, or perform any necessary actions
    }
  };

  const uploadCsvFileHandler = (event) => {
    // Handle the uploaded file here
    const file = event.target.files[0];
    if (file) {
      setIsModalOpen({
        open: true,
        currentComponent: "uploadFile",
        name: `${data.button}`,
        data: {
          fileName: file.name,
          file: file,
        },
      });
    } else {
      errorNotification("File is not selected");
    }
  };

  const buttonHandler = (data) => {
    if (data === "Upload CSV File") {
      document.getElementById("file-upload").click();
    } else {
      setIsModalOpen({
        open: true,
        currentComponent: "playstore",
        name: `${data}`,
        data: {
          fileName: "",
          file: "",
        },
      });
    }
  };

  const playStoreHandler = async () => {
    if (userRole === "individual") {
      const { data, error } = await supabase
        .from("integrations")
        .select("*")
        .eq("user_id", userId)
        .eq("integration_source", "Play Store");
      if (!error) {
        if (data && data.length > 0) {
          setPlayStoreDetails(data[0]);
        }
      }
    } else {
      const { data, error } = await supabase
        .from("integrations")
        .select("*")
        .eq("organization_id", orgId)
        .eq("integration_source", "Play Store");
      if (!error) {
        if (data && data.length > 0) setPlayStoreDetails(data[0]);
      }
    }
  };

  const appStoreHandler = async () => {
    if (userRole === "individual") {
      const { data, error } = await supabase
        .from("integrations")
        .select("*")
        .eq("user_id", userId)
        .eq("integration_source", "App Store");
      if (!error) {
        if (data && data.length > 0) setAppStoreDetails(data[0]);
      }
    } else {
      const { data, error } = await supabase
        .from("integrations")
        .select("*")
        .eq("organization_id", orgId)
        .eq("integration_source", "App Store");
      if (!error) {
        if (data && data.length > 0) setAppStoreDetails(data[0]);
      }
    }
  };

  return (
    <>
      <Box className={classes.cardContainer} sx={{ height: '240px' }}>
        <Stack sx={{ padding: 3, height: '100%' }} alignItems={"center"} gap={2} justifyContent={'center'}>
          {data.button === "Upload CSV File" &&
            statusDetails.status === "processing" ? (
            <CircularProgress size={90} thickness={5} value={100} />
          ) : (
            <>
              {data.image}
              {data.button === "Connect Google Play Store" &&
                playStoreDetails && <h4> {playStoreDetails.app_id} </h4>}

              {data.button === "Connect App Store app" && appStoreDetails && (
                <h4> {appStoreDetails.app_id} </h4>
              )}

              {(data.button === "Connect Google Play Store" &&
                playStoreDetails &&
                playStoreDetails.app_id) ||
                (data.button === "Connect App Store app" &&
                  appStoreDetails &&
                  appStoreDetails.app_id) ? (
                <CommonButton
                  variant="outlined"
                  buttonName="Disconnect"
                // onClick={() => /* Add your disconnect logic here */}
                />
              ) : (
                <CommonButton
                  buttonName={data.button}
                  onClick={() => buttonHandler(data.button)}
                />
              )}

              {/* <CommonButton
                buttonName={data.button}
                onClick={() => buttonHandler(data.button)}
              /> */}
            </>
          )}

          {statusDetails.status === "processing" && (
            <>
              <h3 style={{ fontSize: '12px', marginTop: '10px' }}>
                {data.button === "Upload CSV File" && statusDetails.job_name}
              </h3>
              <h3>
                {" "}
                {data.button === "Upload CSV File" && statusDetails.status}
              </h3>
            </>
          )}
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={uploadCsvFileHandler}
          />
        </Stack>
      </Box>
      <CommonModal
        modalOpen={isModalOpen}
        handleClose={() =>
          setIsModalOpen({ open: false, currentComponent: "", name: "" })
        }
      />
    </>
  );
};

export default UploadCard;
