import CommonButton from "@/components/common/Button";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { letTalkUrl } from "@/helper";
import { createCheckoutHandler } from "@/service/Pricing.service";
import { errorNotification } from "@/helper/Notification";

const PricingCard = (props) => {
  const [loading, setLoading] = useState(false);
  const {
    planHead,
    planPara,
    planPrice,
    planPoint,
    priceId,
    planTime,
    recommond,
    notForSale,
  } = props;

  const checkoutHandler = async (priceId) => {
    try {
      setLoading(true);
      const payload = {
        price: priceId
      };

      const { data, message, success } = await createCheckoutHandler(payload);

      if (success) {
        console.log("datatatatta", data.sessionUrl);
        window.history.replaceState({}, document.title, window.location.href); // Save the current state in the browser history
        window.location.replace(data.sessionUrl);
      } else {
        errorNotification(message);
      }
    } catch (error) {
      errorNotification(message);
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #e3e3e3",
        padding: "30px 20px",
        borderRadius: "10px",
        width: "300px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
      className='pricing_card'
    >
      <Box sx={{ position: 'relative' }}>
        {
          recommond === "true" &&
          <Box sx={{
            background: '#7a52f4',
            position: ' absolute',
            top: '-44px',
            color: '#fff',
            padding: '4px 15px',
            fontSize: ' 12px',
            borderRadius: ' 15px',
            right: '50%',
            transform: 'translate(50%, 0%)',
          }}>RECOMMONDED</Box>
        }
        <Typography fontSize={"18px"} fontWeight={700} mb={'10px'}>
          {planHead}
        </Typography>
        <Box height={'66px'} mb={2}>
          {notForSale !== "true" ? (
            <Stack flexDirection={"row"} >
              <Typography fontSize={"40px"} fontWeight={700}>
                ${(planPrice / 100)}
              </Typography>
              <Typography fontWeight={600} lineHeight={3}>
                / {planTime}
              </Typography>
            </Stack>
          ) : (
            <Stack flexDirection={"row"} >
              <Typography fontSize={"40px"} fontWeight={700}>
                Let's talk!
              </Typography>
            </Stack>
          )}
        </Box>

        <Typography
          fontSize={"14px"}
          fontWeight={400}
          sx={{ color: "black.para", minHeight: "65px" }}
        >
          {planPara}
        </Typography>
        <Stack gap={"12px"} mt={'10px'} mx={"5px"}>
          {planPoint &&
            planPoint.map((data, i) => {
              return (
                <Stack
                  key={i}
                  flexDirection={"row"}
                  gap={1}
                  alignItems={"center"}
                >
                  <CheckCircleIcon
                    sx={{ color: "#999999", fontSize: "16px" }}
                  />
                  <Typography fontSize={"15px"} sx={{ color: "black.para" }}>
                    {data.name}
                  </Typography>
                </Stack>
              );
            })}
        </Stack>
      </Box>
      <Stack mt={5}>
        {notForSale !== "true" ? (
          <CommonButton
            buttonName="Subscribe Now"
            loading={loading}
            disabled={loading}
            onClick={() => checkoutHandler(priceId)}
            // buttonColor={recommond === "true" ? "primary" : "light"}
            style={{ backgroundColor: recommond === "true" ? '' : '#7a52f470 !important' }}
          />
        ) : (
          <CommonButton
            buttonName="Book a demo"
            onClick={() => window.open(letTalkUrl, "_blank")}
            // buttonColor={recommond ? "primary" : "light"}
            style={{ backgroundColor: recommond === "true" ? '' : '#7a52f470 !important' }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default PricingCard;
