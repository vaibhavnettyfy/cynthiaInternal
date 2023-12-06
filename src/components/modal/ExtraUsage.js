import {
  Box,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import CommonButton from "../common/Button";
import React, { useEffect, useState } from "react";
import { errorNotification } from "@/helper/Notification";
import { supabase } from "@/Client";
import { EventEmitter } from "@/helper";
import * as amplitude from '@amplitude/analytics-browser';

const ExtraUsage = ({ handleClose ,modalOpen}) => {
  let userId = "";
  let orgId = "";
  let userRole = "";


  const amplitudekey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
  amplitude.init(amplitudekey);

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
    userRole = localStorage.getItem("userRole");
    orgId = localStorage.getItem("orgId");
  }

  const enabledUsageHandler = async () => {
    if (userRole === "individual") {
      const payload = {
        usage_based_pricing: "TRUE",
      };
      const { data, error } = await supabase
        .from("user_usage")
        .update(payload)
        .eq("user_id", userId);
      if (!error) {
        const eventpayload = {
          usage:"TRUE",
          setting_timestamp:Math.floor(Date.now() / 1000),
          current_usage:modalOpen?.data?.reviewUsed,
          extra_current_usage:modalOpen?.data?.extra_current_usage
        }
        amplitude.track("Usage-Based Pricing Set",eventpayload)
        EventEmitter.dispatch('usageUpgrade',true);
        handleClose();
      }
    } else {
      const payload = {
        usage_based_pricing: "TRUE",
      };
      const { data, error } = await supabase
        .from("user_usage")
        .update(payload)
        .eq("organization_id", orgId);
      if (!error) {
        const eventpayload = {
          usage:value,
          setting_timestamp:Math.floor(Date.now() / 1000),
          current_usage:modalOpen?.data?.reviewUsed,
          extra_current_usage:modalOpen?.data?.extra_current_usage
        }
        amplitude.track("Usage-Based Pricing Set",eventpayload)
        handleClose();
        EventEmitter.dispatch('usageUpgrade',true);
      }
      console.log("data--->", data);
      console.log("error-", error);
    }
  };

  return (
    <>
      <Box
        width={"450px"}
        height={"265px"}
        sx={{ borderRadius: "24px", padding: "30px" }}
      >
        <DialogContent
          sx={{
            height: "100%",
            padding: "0px",
            textAlign: "center",
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            fontSize={"16px"}
            fontWeight={"500"}
            lineHeight={"25px"}
            marginBottom={2}
          >
            Please enabled usage-based pricing for extra usage.Additional usage
            will be charged as per your plan.
          </Typography>
          <Stack flexDirection={"row"} gap={"10px"}>
            <CommonButton buttonName="cancel" onClick={handleClose} />
            <CommonButton
              buttonName="ENABLE"
              onClick={() => enabledUsageHandler()}
            />
          </Stack>
        </DialogContent>
      </Box>
    </>
  );
};

//   export default SwitchAccount;

export default ExtraUsage;
