import React, { useEffect, useRef, useState } from "react";
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
import ReactDOM from "react-dom";
import { circularProgressClasses } from "@mui/material/CircularProgress";
import Sentiments from "./Sentiments";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PdfContent from "./PdfContent";

const ReportDetails = ({ data, name }) => {
  let list = data || [];

  const progressValue = 80;
  
  const [downloadInvoice, setDownloadInvoice] = useState(false);

  const pdfHandler = (index,topic) => {
    const container = document.createElement("div"); // create a div element
    document.body.appendChild(container); 
    const pdfContentProps = { res: list[index] };

    ReactDOM.render(<PdfContent {...pdfContentProps} />, container);

    html2canvas(container).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 dimensions in mm
      pdf.save(`${topic}-${index + 1}.pdf`); // use index in the file name
      document.body.removeChild(container); // remove the dynamically created div
    });
  };

  

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
      </Stack>
      <div
        // style={{
        //   width: "100%", // Adjust to make it responsive
        //   maxWidth: "210mm", // A4 width
        //   // height: "100%",
        // }}
      >
        {list.map((res, index) => {
          const inputString = res?.summary_bullet;
          const representative = res?.representative_docs;
          let result = inputString.match(/"([^"]*)"/g);
          let representativeResult = representative.match(/"([^"]*)"/g);
          return (
            <React.Fragment key={index}>
              {/* ref={pdfHandlers.current[index]} */}
              <Box key={index}>
                <Stack
                  alignItems={"flex-end"}
                  gap={"3px"}
                  // marginTop={1}
                  sx={{ cursor: "pointer" }}
                >
                  <Box textAlign={'center'} onClick={() => pdfHandler(index,res.topic)}>
                    <Image src={ios_share} />
                    <Typography
                      fontSize={"12px"}
                      fontWeight={"500"}
                      color={"#c1c1c1"}

                    >
                      SHARE
                    </Typography>
                  </Box>
                </Stack>
                <PdfContent res={res}/>
              </Box>
              <Divider sx={{marginBottom:1}}/>
            </React.Fragment>
          );
        })}
      </div>
    </Box>
  );
};

export default ReportDetails;
