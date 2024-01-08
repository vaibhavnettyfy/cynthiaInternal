"use client";
import React, { useState } from "react";
import { Tabs, Tab, Paper, Typography, Box, CircularProgress } from "@mui/material";
import PersonalInformation from "./sections/PersonalInformation";
import Password from "./sections/Password";
import Plan from "./sections/Plan";
import Usage from "./sections/Usage";
import Members from "./sections/Members";
import TermsService from "./sections/TermsService";
import PrivacyPolicy from "./sections/PrivacyPolicy";
import WithAuth from "../WithAuth";
import { supabase } from "@/Client";
import { upgradePlanHandler } from "@/service/plan.service";
import { managePlanHandler } from "@/helper";
import Pricing from "./sections/Pricing";
import { useRouter } from "next/navigation";

const Settings = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const allowRoleUsage = ["individual", "org_admin"];
  const memberRoleUsage = ["org_admin"];
  const router = useRouter()

  let userRole = "";
  if (typeof window !== "undefined") {
    userRole = localStorage.getItem("userRole") || "";
  }

  const handleChange = async (event, newValue) => {
    if (newValue === 2) {
      setLoading(true);
      managePlanHandler();
    }
    setSelectedTab(newValue);
  };

  // render Componenet Here
  const renderComponents = () => {
    switch (selectedTab) {
      case 0:
        return <PersonalInformation />;
      case 1:
        return <Password />;
      case 2:
        return allowRoleUsage.includes(userRole) ? <Plan /> : null;
      case 3:
        return allowRoleUsage.includes(userRole) ? <Usage /> : null;
      // if (allowRoleUsage.includes(userRole && userRole)) {
      //   return <Usage />;
      // } // Return null if the condition is not met.
      case 4:
        return memberRoleUsage.includes(userRole && userRole) ? (
          <Members />
        ) : null;
      case 5:
        return <TermsService />;
      case 6:
        return <PrivacyPolicy />;
      case 7:
        return <Pricing />;
      default:
        return null; // Return null if the selectedTab doesn't match any case.
    }
  };

  const handleClick = () => {
    if (!loading) {
      managePlanHandler()
      setLoading(true)
    }
  }

  return (
    <Box height={"100vh"} display={"flex"} sx={{ overflow: "hidden" }}>
      <Paper elevation={3} style={{ width: "270px" }}>
        <Box padding={3}>
          <Typography fontSize={"30px"} fontWeight={"600"} lineHeight={"35px"}>
            Settings
          </Typography>
        </Box>
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Personal Information" />
          <Tab label="Password" />
          {allowRoleUsage.includes(userRole && userRole) && (
            <Box
              // [managePlanHandler(),setLoading(true)]
              onClick={() => handleClick()}
              sx={{
                fontSize: "0.875rem",
                padding: "10px 25px !important",
                minHeight: "48px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                color: loading ? 'rgba(0, 0, 0, 0.3)' : "rgba(0, 0, 0, 0.6)",
                fontWeight: "500",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              Manage Your Plan &nbsp;&nbsp; {loading && <CircularProgress size="1.5rem" />}
            </Box>
          )}
          {allowRoleUsage.includes(userRole && userRole) && (
            <Tab label="Usage" />
          )}
          {memberRoleUsage.includes(userRole && userRole) && (
            <Tab label="Members" value={4} />
          )}
          <Tab label="Terms of Service" value={5} />
          <Tab label="Privacy Policy" value={6} />
          <Box
            onClick={() => router.push('/admin/pricing')}
            sx={{
              fontSize: "0.875rem",
              padding: "10px 25px !important",
              minHeight: "48px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "rgba(0, 0, 0, 0.6)",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Pricing
          </Box>
        </Tabs>
      </Paper>
      <Box
        padding={3}
        width={"calc(100vw - 350px)"}
        height={"100%"}
        sx={{ overflow: "auto" }}
      >
        {selectedTab === 2 ? null : renderComponents()}
      </Box>
    </Box>
  );
};

export default WithAuth(Settings);
