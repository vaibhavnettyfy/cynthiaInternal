"use client";
import React from "react";
import { Tabs, Tab, Paper, Typography, Box } from "@mui/material";
import PersonalInformation from "./sections/PersonalInformation";
import Password from "./sections/Password";
import Plan from "./sections/Plan";
import Usage from "./sections/Usage";
import Members from "./sections/Members";
import TermsService from "./sections/TermsService";
import PrivacyPolicy from "./sections/PrivacyPolicy";
import WithAuth from "../WithAuth";

const Settings = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const allowRoleUsage = ["individual", "org_admin"];
  const memberRoleUsage = ["org_admin"];

  let userRole = "";
  if (typeof window !== "undefined") {
    userRole = localStorage.getItem("userRole");
  }

  const handleChange = (event, newValue) => {
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
        return <Plan />;
      case 3:
        return allowRoleUsage.includes(userRole) ? <Usage /> : null;
      // if (allowRoleUsage.includes(userRole && userRole)) {
      //   return <Usage />;
      // } // Return null if the condition is not met.
      case 4:
        return memberRoleUsage.includes(userRole && userRole) ? (
          <Members />
        ) : null;
        // }
        return null;
      case 5:
        return <TermsService />;
      case 6:
        return <PrivacyPolicy />;
      default:
        return null; // Return null if the selectedTab doesn't match any case.
    }
  };

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
          <Tab label="Manage Your Plan" />
          {allowRoleUsage.includes(userRole && userRole) && (
            <Tab label="Usage" />
          )}
          {memberRoleUsage.includes(userRole && userRole) && (
            <Tab label="Members" value={4} />
          )}
          <Tab label="Terms of Service" value={5} />
          <Tab label="Privacy Policy" value={6} />
        </Tabs>
      </Paper>
      <Box
        padding={3}
        width={"calc(100vw - 350px)"}
        height={"100%"}
        sx={{ overflow: "auto" }}
        className="inputbox"
      >
        {renderComponents()}
      </Box>
    </Box>
  );
};

export default WithAuth(Settings);
