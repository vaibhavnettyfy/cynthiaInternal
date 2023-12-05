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
import { EventEmitter, UPLOADINTEGRATION, checkFeatures } from "@/helper";
import CommonModal from "../common/Modal";
import { supabase } from "@/Client";
import { errorNotification } from "@/helper/Notification";

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
    button: "Connect Zendesk",
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

  let userId = "";
  let orgId = "";
  let userRole = "";

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
    userRole = localStorage.getItem("userRole");
    orgId = localStorage.getItem("orgId");
  }

  const [reviewUsed, setReviewUsed] = useState(0);
  const [baseReview, setBaseReview] = useState(0);
  const [queryUsage, setQueryUsage] = useState(0);
  const [baseQueries, setBaseQueries] = useState(0);
  const [usageBased,setUsageBased] = useState(false);
  const [extraCurrentUsage, setExtraCurrentUsage] = useState(0);
  
  useEffect(() => {
    checkHandler();
    notificationHandler();
  }, []);

  // EventEmitter.dispatch('usageUpgrade',true);
  EventEmitter.subscribe('usageUpgrade',(res)=>{
    userUsageHandler();
    subscriptionsDataHandler();
  })

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

  const notificationHandler = () => {
    userUsageHandler();
    subscriptionsDataHandler();
  };

  const userUsageHandler = async () => {
    const { data, error } =
      userRole === "individual"
        ? await supabase.from("user_usage").select("*").eq("user_id", userId)
        : await supabase
            .from("user_usage")
            .select("*")
            .eq("organization_id", orgId);

    setReviewUsed(data[0]?.reviews_used);
    setQueryUsage(data[0]?.query_usage);
    setUsageBased(data[0]?.usage_based_pricing);
    setExtraCurrentUsage(data[0]?.extra_current_usage)
  };

  const productDataHandler = async (pId) => {
    try {
      if (userId) {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", pId);
        if (error) {
          errorNotification(error.message);
        } else {
          // setPlanName(data[0]?.name);
          setBaseQueries(data[0]?.metadata.base_queries);
          setBaseReview(data[0]?.metadata.base_reviews);
          // setExtraCreditCost(data[0]?.metadata.extra_credit_cost);
        }
      }
    } catch (error) {
      errorNotification(error.message || "Something_went_wrong");
    }
  };

  const subscriptionsDataHandler = async () => {
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId);
      if (error) {
      } else {
        // setProductId(data[0]?.product_id);
        productDataHandler(data[0]?.product_id);
      }
    } catch (error) {
      // errorNotification(error.message || "something_Went_Wrong");
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
          {`You have used ${reviewUsed??0} of ${baseReview??0} credits. You have used ${queryUsage??0} of ${baseQueries??0} free queries`}
          {
            usageBased ? 'Usage-based pricing is enabled. You will be charged additionally for extra usage based on your plan. You may disable it in the usage settings.' :
          <span
            style={{ color: "#7a52f4", cursor: "pointer" }}
            onClick={() =>
              setIsModalOpen({
                open: true,
                currentComponent: "ExtraUsage",
                data: {
                  reviewUsed :reviewUsed,
                  extra_current_usage:extraCurrentUsage
                },
              })
            }
          >
            {" "}
            Please enable usage-based pricing for extra usage.
          </span>
          }
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
