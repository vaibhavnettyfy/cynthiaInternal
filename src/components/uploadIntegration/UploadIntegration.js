"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UploadCard from "./UploadCard";
import Image from "next/image";
import {
  Appstore,
  Csv,
  Intercom,
  Playstore,
  Salesforce,
  Zendesk,
} from "@/helper/constant";
import Link from "next/link";
import WithAuth from "../WithAuth";
import { UPLOADINTEGRATION, checkFeatures } from "@/helper";
import CommonModal from "../common/Modal";
import { supabase } from "@/Client";

const uploadData = [
  {
    image: <Image src={Csv} style={{ width: "90px", height: "90px" }} />,
    button: "Upload CSV File",
  },
  {
    image: <Image src={Playstore} style={{ width: "90px", height: "90px" }} />,
    button: "Connect Google Play Store",
  },
  {
    image: <Image src={Appstore} style={{ width: "90px", height: "90px" }} />,
    button: "Connect App Store app",
  },
  {
    image: <Image src={Zendesk} style={{ width: "90px", height: "90px" }} />,
    button: " Connect Zendesk",
  },
  {
    image: <Image src={Intercom} style={{ width: "90px", height: "90px" }} />,
    button: "Connect Intercom",
  },
  {
    image: (
      <Image src={Salesforce} style={{ width: "130px", height: "85px" }} />
    ),
    button: "Connect Salesforce",
  },
];

const UploadIntegration = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    currentComponent: "",
    data: null,
  });

  useEffect(() => {
    checkHandler();
  }, []);

  const checkHandler = async () => {
    const { status, message } = await checkFeatures(UPLOADINTEGRATION);
    if (!status) {
      setIsModalOpen({
        open: true,
        currentComponent: "checkFeature",
        data: {
          message,
        },
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          background: "rgba(105,6,235,0.2)",
          padding: "10px 50px",
          borderRadius: "5px",
        }}
        marginX={3}
      >
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "22px",
            color: "#000",
          }}
        >
          You have 2300 credits left of 3000 to analyse. Additional usage will
          be charged as per your plan.
          <Link href="#"> Usage-based pricing.</Link>
        </Typography>
      </Box>
      <Box padding={3}>
        <Box>
          <Typography
            sx={{ fontSize: "37px", fontWeight: "700", lineHeight: "52px" }}
          >
            Upload or integrate to analyse
          </Typography>
          <Typography
            marginLeft={2}
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "36px",
              color: "#7f7f7f",
            }}
          >
            Upload a csv file to analyse or integrate your data sources
          </Typography>
        </Box>
        <Box>
          <Grid container gap={3} justifyContent={"center"} marginTop={5}>
            {uploadData.map((data, i) => {
              return (
                <Grid item xs={3.5} key={i}>
                  <UploadCard data={data} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <CommonModal
        modalOpen={isModalOpen}
        handleClose={() =>
          setIsModalOpen({
            open: false,
            currentComponent: "",
            data: null,
          })
        }
      />
    </>
  );
};

export default WithAuth(UploadIntegration);
