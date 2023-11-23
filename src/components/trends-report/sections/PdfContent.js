import React from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  ios_share,
  quoteleft,
  quoteright,
  good,
  bad,
  ohk,
} from "@/helper/constant";
import { circularProgressClasses } from "@mui/material/CircularProgress";
import Sentiments from "./Sentiments";
import Image from "next/image";

function pdfContent({ res }) {
  const inputString = res?.summary_bullet;
  const representative = res?.representative_docs;
  let result = inputString.match(/"([^"]*)"/g);
  let representativeResult = representative.match(/"([^"]*)"/g);

  return (
    <div
      style={{
        width: "100%", // Adjust to make it responsive
        maxWidth: "300mm", // A4 width
        maxHeight: "500mm", // A4 height
        height: "100%",
        margin: 'auto',
      }}
    >
      <Box padding={5}>
        <Stack flexDirection={"row"} alignItems={"start"} gap={3}>
          <Stack alignItems={"center"} gap={"5px"}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                width: "fit-content",
              }}
            >
              <Box sx={{ position: "relative", height: "90px" }}>
                <CircularProgress
                  variant="determinate"
                  sx={{
                    color: (theme) =>
                      theme.palette.grey[
                      theme.palette.mode === "light" ? 200 : 800
                      ],
                  }}
                  size={90}
                  thickness={5}
                  value={100}
                />
                <CircularProgress
                  variant="determinate"
                  disableShrink
                  sx={{
                    color: "#7a52f4",
                    position: "absolute",
                    left: 0,
                    borderRadius: "50%",
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: "round",
                    },
                  }}
                  size={90}
                  thickness={5}
                  value={res.percentage_count}
                />
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                fontSize={"20px"}
                fontWeight={"600"}
                sx={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  textAlign: "center",
                }}
              >
                {`${Math.round(res.percentage_count)}%`}
              </Typography>
            </div>
            <Typography fontSize={"14px"} fontWeight={"500"}>
              {`Total Count : ${res.count}`}
            </Typography>
          </Stack>
          <Typography fontSize={"27px"} fontWeight={"600"} lineHeight={"35px"}>
            {`${res.topic}`}
          </Typography>
        </Stack>
        <Typography padding={"20px 10px"} fontWeight={"500"}>
          {res.summary}
        </Typography>

        <Box paddingY={3}>
          <Typography fontSize={"25px"} fontWeight={"600"} lineHeight={"30px"}>
            User Sentiment
          </Typography>
          <Stack flexDirection={"row"} gap={3} marginTop={2}>
            <Sentiments
              name={"Positive"}
              per={res.positive_percentage}
              img={good}
              color={"#7bc043"}
            />
            <Sentiments
              name={"Negative"}
              per={res.negative_percentage}
              img={bad}
              color={"#f44336"}
            />
            <Sentiments
              name={"Mixed"}
              per={res.mixed_percentage}
              img={ohk}
              color={"#ff7f50"}
            />
          </Stack>
        </Box>
        <Box paddingY={3}>
          <Typography fontSize={"25px"} fontWeight={"600"} lineHeight={"30px"}>
            Findings
          </Typography>
          <Stack padding={"20px 0 0 40px"} gap={2}>
            {result &&
              result.length > 0 &&
              result?.map((res) => {
                return <Typography> - {res} </Typography>;
              })}
          </Stack>
          <Stack
            maxWidth={"650px"}
            margin={"auto"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"20px 50px 20px 60px"}
            gap={2}
          >
            <Image
              alt="quoteleft"
              src={quoteleft}
              style={{
                width: "25px",
                height: "25px",
                alignSelf: "flex-start",
              }}
            />
            <Typography
              paddingY={2}
              fontWeight={"400"}
              fontSize={"14px"}
              color={"#7f7f7f"}
            >
              <i style={{ overflowWrap: "anywhere" }}>
                {representativeResult && representativeResult[0]}
              </i>
            </Typography>
            <Image
              src={quoteright}
              alt="quoteright"
              style={{
                width: "25px",
                height: "25px",
                alignSelf: "flex-end",
              }}
            />
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default pdfContent;
