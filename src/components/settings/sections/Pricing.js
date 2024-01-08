"use client";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import Monthly from "./pricingsection/Monthly";
import Yearly from "./pricingsection/Yearly";
import { displayPriceHandler } from "@/service/Pricing.service";
const Pricing = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [priceList, setPriceList] = useState([]);
  const [priceFlag, setPriceFlag] = useState(false);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    const intervalHandler = newValue === 1 ? "year" : "month";
    priceDisplayPricing(intervalHandler);
  };

  useEffect(() => {
    const interval = selectedTab === 1 ? "year" : "month";
    priceDisplayPricing(interval);
  }, []);

  

  const priceDisplayPricing = async (intervalText) => {
    const { data, message, success } = await displayPriceHandler(intervalText);
    if (success) {
      setPriceList(data);
      setPriceFlag(true);
    } else {
      setPriceList(data || []);
      setPriceFlag(true);
    }
  };

  const renderComponents = () => {
    switch (selectedTab) {
      case 0:
        return <Monthly priceList={priceList} />;
      case 1:
        return <Yearly priceList={priceList} />;
      default:
        return null;
    }
  };
  return (
    <Box
      height={"-webkit-fill-available"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      className={"pricing_area"}
    >
      {priceFlag && (
        <>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Monthly" />
            <Tab label="Yearly" />
          </Tabs>
          <Box
            mt={2}
            padding={2}
            width={"100%"}
            sx={{
              overflow: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {renderComponents()}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Pricing;
