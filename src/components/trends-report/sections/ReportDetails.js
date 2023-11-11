import React, { useRef, useState } from "react";
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
import Image from "next/image";
import { circularProgressClasses } from "@mui/material/CircularProgress";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sentiments from "./Sentiments";


const ReportDetails = ({ data,name }) => {
  let list = data || [];

  const progressValue = 80;

  const divRef = useRef(null);
  const [downloadInvoice, setDownloadInvoice] = useState(false);

  const downloadPdf = () => {
    const divToCapture = divRef.current;

    html2canvas(divToCapture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 dimensions in mm
      pdf.save("downloaded-pdf.pdf");
    });
  };

  if (list.length === 0) {
    //when data is length is zero.
    return <div>No data found.</div>;
  }

  return (
    <Box margin={"0 100px"}>
      <Stack
        gap={4}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={1}
      >
        <Box width={"100%"}>
          <Typography
            fontSize={"30px"}
            fontWeight={"600"}
            lineHeight={"30px"}
            marginBottom={3}
            marginTop={1}
            marginLeft={2}
          >
            {name}
          </Typography>
          <Divider />
        </Box>
        <Stack
          alignItems={"center"}
          gap={"3px"}
          sx={{ cursor: "pointer" }}
          onClick={downloadPdf}
        >
          <Image src={ios_share} />
          <Typography fontSize={"12px"} fontWeight={"500"} color={"#c1c1c1"}>
            SHARE
          </Typography>
        </Stack>
      </Stack>
      <div
        ref={divRef}
        style={{
          width: "100%", // Adjust to make it responsive
          maxWidth: "210mm", // A4 width
          // height: "100%",
        }}
      >
        {list.map((res) => {
          const inputString = res?.summary_bullet
          // representative_docs
          const representative = res?.representative_docs;
          let result = inputString.match(/"([^"]*)"/g);
          let representativeResult = representative.match(/"([^"]*)"/g);
          return (
            <>
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
                  <Typography
                    fontSize={"27px"}
                    fontWeight={"600"}
                    lineHeight={"35px"}
                  >
                    {`${res.topic}`}
                  </Typography>
                </Stack>
                <Typography padding={"20px 10px"} fontWeight={"500"}>
                  {res.summary}
                </Typography>

                <Box paddingY={3}>
                  <Typography
                    fontSize={"25px"}
                    fontWeight={"600"}
                    lineHeight={"30px"}
                  >
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
                  <Typography
                    fontSize={"25px"}
                    fontWeight={"600"}
                    lineHeight={"30px"}
                  >
                    Findings
                  </Typography>
                  <Stack padding={"20px 0 0 40px"} gap={2}>
                    {
                      result && result.length >0 && result?.map((res)=>{
                        return(
                          <Typography> - {res} </Typography>
                        )
                      })
                    }
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
                      <i style={{overflowWrap:"anywhere"}}>{representativeResult && representativeResult[0]}</i>
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
              <Divider />
            </>
          );
        })}
      </div>
    </Box>
  );
};

export default ReportDetails;
