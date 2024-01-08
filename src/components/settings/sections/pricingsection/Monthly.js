import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import PricingCard from "./PricingCard";


const Monthly = (priceList) => {
  const priceData = priceList.priceList || [];
  return (
    <Box>
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

export default Monthly;
