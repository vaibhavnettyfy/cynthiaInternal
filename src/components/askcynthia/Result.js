import React from "react";
import {
  query_stats,
  close,
  ios_share,
  quoteright,
  quoteleft,
} from "@/helper/constant";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SouthEastIcon from "@mui/icons-material/SouthEast";
const Result = () => {
  return (
    <Box padding={3} margin={"0 250px"}>
      <Stack
        flexDirection={"row"}
        gap={2}
        alignItems={"center"}
        paddingX={3}
        marginBottom={3}
      >
        <Image src={query_stats} style={{ width: "40px", height: "40px" }} />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ margin: "0" }}
        />
        <Box width={"100%"}>
          <Typography fontSize={"35px"} fontWeight={"500"} lineHeight={"37px"}>
            What are users saying about payments?”
          </Typography>
        </Box>
        <Image
          src={close}
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
        />
        <Image
          src={ios_share}
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
        />
      </Stack>

      <Box maxWidth={"950px"} margin={"auto"} paddingY={4}>
        <Stack flexDirection={"row"} gap={"3px"}>
          <SouthEastIcon sx={{ color: "#7a52f4", marginTop: "2px" }} />
          <Typography fontSize={"20px"} fontWeight={"600"} color={"#7a52f4"}>
            EXPLORING
          </Typography>
        </Stack>
        <Typography
          fontSize={"25px"}
          fontWeight={"600"}
          lineHeight={"35px"}
          marginBottom={1}
        >
          "Payment Experience"
        </Typography>
        <Typography
          fontSize={"18px"}
          fontWeight={"400"}
          lineHeight={"25px"}
          marginBottom={1}
        >
          Users have mentioned various issues with the payment experience,
          including multiple auto-debiting of EMIs, slow repayment process,
          non-responsive customer service, payment not generating in the app,
          and unauthorized deductions.
        </Typography>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          padding={"15px 100px 0 50px"}
        >
          <Typography fontSize={"16px"} fontWeight={"600"} lineHeight={"28px"}>
            Was this response helpful?
          </Typography>
          <Stack gap={"10px"} display={"flex"} flexDirection={"row"}>
            <ThumbUpIcon sx={{ color: "#7a52f4" }} />
            <ThumbDownIcon sx={{ color: "#7a52f4" }} />
          </Stack>
        </Stack>
      </Box>
      <Box maxWidth={"1050px"} margin={"auto"} paddingY={4}>
        <Typography
          fontSize={"20px"}
          fontWeight={"600"}
          color={"#7a52f4"}
          marginBottom={"10px"}
        >
          Multiple auto-debiting of EMIs
        </Typography>
        <Typography
          fontSize={"18px"}
          fontWeight={"500"}
          lineHeight={"25px"}
          marginBottom={1}
          paddingX={2}
        >
          Users have reported that their EMIs were debited multiple times
          without their consent or knowledge. They have expressed frustration
          with the lack of response from customer care regarding this issue.
        </Typography>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingX={5}
          gap={2}
        >
          <Image
            src={quoteleft}
            style={{ width: "25px", height: "25px", alignSelf: "flex-start" }}
          />
          <Typography
            fontSize={"16px"}
            paddingY={2}
            fontWeight={"400"}
            lineHeight={"25px"}
          >
            <i>
              When i made the payment for the EMIs I found out that the amount
              was debited two times. Please improve your systems and I still
              have to receive the payment".
            </i>
          </Typography>
          <Image
            src={quoteright}
            style={{ width: "25px", height: "25px", alignSelf: "flex-end" }}
          />
        </Stack>
      </Box>
      <Box maxWidth={"1050px"} margin={"auto"} paddingY={4}>
        <Typography
          fontSize={"20px"}
          fontWeight={"600"}
          color={"#7a52f4"}
          marginBottom={"10px"}
        >
          Slow repayment process
        </Typography>
        <Typography
          fontSize={"18px"}
          fontWeight={"500"}
          lineHeight={"25px"}
          marginBottom={1}
          paddingX={2}
        >
          Users have reported experiencing a slow repayment process while using
          the app. They have mentioned that they are unable to pay their EMIs,
          customer service is not available, and there is a delay in debiting
          the payment amount from their accounts.
        </Typography>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingX={5}
          gap={2}
        >
          <Image
            src={quoteleft}
            style={{ width: "25px", height: "25px", alignSelf: "flex-start" }}
          />
          <Typography
            fontSize={"16px"}
            paddingY={2}
            fontWeight={"400"}
            lineHeight={"25px"}
          >
            <i>
              I paid my EMI 2 days ago and still it is taking so much time to
              process, your customer service is pathetic, they didn't even
              bother responding. Please do something about it!
            </i>
          </Typography>
          <Image
            src={quoteright}
            style={{ width: "25px", height: "25px", alignSelf: "flex-end" }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Result;
