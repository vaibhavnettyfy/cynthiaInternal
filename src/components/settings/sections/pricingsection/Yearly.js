import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import PricingCard from "./PricingCard";

const yearlyData = [
  {
    planHead: "Startup",
    planPara: "This essentials for when you're just getting started.",
    planPrice: "299",
    planPoint: [
      "2000 Credits",
      "Queries & Reports",
      "CSV file",
      "Data Source Integrations",
    ],
    planTime: "year",
  },
  {
    planHead: "Business",
    planPara:
      "For businesses looking to achieve maximum efficiency and time savings.",
    planPrice: "349",
    planPoint: [
      "5000 credit",
      "Expert Data Analysis",
      "Data Source Integrations",
      "Onboarding support",
    ],
    planTime: "year",
    recommond: true,
  },
  {
    planHead: "Enterprises",
    planPara:
      "For businesses looking for the maximum competitive edge and expanding their reach.",
    planPrice: "499",
    planPoint: [
      "Customer Onboarding",
      "Dedicated Success Manager",
      "API Access",
      "Support email, chat and Call",
    ],
    planTime: "year",
  },
];

const Yearly = (priceList) => {
  const priceData = priceList.priceList || [];
  return (
    <Box
      height={"-webkit-fill-available"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Stack gap={3} flexDirection={"row"}>
        {priceData &&
          priceData.map((data, i) => {
            return (
              <PricingCard
                notForSale={data?.product?.metadata?.not_for_sale}
                planHead={data?.product?.name}
                planPara={data?.product?.description}
                planPrice={data?.unit_amount}
                priceId={data?.id}
                planPoint={data?.product?.features}
                planTime={data?.recurring?.interval}
                recommond={data?.product?.metadata?.most_popular}
              />
            );
          })}
      </Stack>
    </Box>
  );
};

export default Yearly;
