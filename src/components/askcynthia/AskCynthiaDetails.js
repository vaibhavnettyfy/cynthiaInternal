"use client";
import React, { useEffect, useRef, useState } from "react";
// import {} from "@h"
import { useSearchParams } from "next/navigation";
import { supabase } from "@/Client";
import Result from "./Result";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import WithAuth from "../WithAuth";
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import CommonButton from "../common/Button";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { askCynthiaPdfHandler } from "@/service/askCynthia.service";
import { errorNotification } from "@/helper/Notification";

function AskCynthiaDetails({
  querryId,
  detailFlag,
  querryDetails,
  querryTopic,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const queryId = searchParams.get("id");
  const [jsonData, setJsonData] = useState(null);
  const [subTopics, setSubTopics] = useState(null);
  const [fileId, setFileId] = useState("");
  const [dataNotFound, setDataNotFound] = useState(false);
  const [likeFlag, setLikeFlag] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [likeShow, setLikeShow] = useState(false);
  const [querryResponse,setQuerryResponse] = useState(null);

  let userRole = "";
  let userId = "";
  let orgId = "";
  let FILEID = "";

  if (typeof window !== "undefined") {
    userRole = localStorage.getItem("userRole");
    userId = localStorage.getItem("userId");
    orgId = localStorage.getItem("orgId");
    FILEID = localStorage.getItem("fileId");
  }

  const backHandler = () => {
    detailFlag();
  };

  useEffect(() => {
    if (querryId) {
      getQuerryDataById(querryId);
    }
  }, []);

  useEffect(() => {
    if (querryDetails) {
      dataDisplay(querryDetails);
    }
  }, [querryDetails]);

  const getQuerryDataById = async (id) => {
    const { data, error } = await supabase
      .from("saved_queries")
      .select("*")
      .eq("id", id);
    setFileId(data[0].file_id);
    const response = data[0].response;
    // here we store data of response because we have to send response to pdf api 
    setQuerryResponse(response);
    const parsedData = JSON.parse(response);
    if (data && data.length > 0) {
      if (response) {
        setJsonData({
          query: parsedData?.query,
          main_topic: parsedData?.main_topic,
          summary: parsedData?.summary,
          docs: parsedData?.docs,
          sub_topic_summary: parsedData?.sub_topic_summary,
        });
        subTopicHandler(parsedData?.sub_topic_summary);
        likeDislikeCheckHandler(data[0].file_id, parsedData?.query);
      } else {
        setDataNotFound(true);
      }
    }
  };

  const dataDisplay = (response) => {
    setQuerryResponse(response);
    const parsedData = JSON.parse(response);
    setJsonData({
      query: parsedData?.query,
      main_topic: parsedData?.main_topic,
      summary: parsedData?.summary,
      docs: parsedData?.docs,
      sub_topic_summary: parsedData?.sub_topic_summary,
    });
    subTopicHandler(parsedData?.sub_topic_summary);
    likeDislikeCheckHandler(FILEID, parsedData?.query);
  };

  const likeDislikeCheckHandler = async (fId, text) => {
    const { data, error } =
      userRole === "individual"
        ? await supabase
            .from("summary_feedback")
            .select("*")
            .eq("user_id", userId)
            .eq("query", querryTopic)
            .eq("file_id", fId)
        : await supabase
            .from("summary_feedback")
            .select("*")
            .eq("organization_id", orgId)
            .eq("query", querryTopic)
            .eq("file_id", fId);
    if (!error) {
      if (data && data.length > 0) {
        if (data[0].feedback) {
          if (data[0].feedback === "Dislike") {
            setDisLike(true);
          } else {
            setLikeFlag(true);
          }
        }
      }
    }
  };

  const subTopicHandler = (data) => {
    const subTopicsData = {}; // Create an object to store the data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const subTopic = data[key];
        subTopicsData[key] = {
          // Store the sub-topic data in the object
          summary: subTopic.summary,
          docs: subTopic.docs,
          key: key,
        };
      }
      setSubTopics(subTopicsData);
    }
  };

  const downloadPdf = async () => {
    const {data,message,success} = await askCynthiaPdfHandler(querryResponse);
    if(success){
      const blob = new Blob([data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.download = `${querryTopic}.pdf`;
      link.href = window.URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }else{
      errorNotification(message);
    }
  };

  const likeHandler = async (res) => {
    // setLikeFlag(!likeFlag);
    // setDisLike(!disLike);
    setLikeFlag(true);
    setDisLike(false);
    const payload = {
      user_id: userId,
      organization_id: null,
      file_id: fileId || FILEID,
      query: querryTopic,
      feedback: "Like",
      summary_response: res.summary,
    };

    if (userRole !== "individual") {
      payload.organization_id = orgId;
    }

    const { data, error } =
      userRole === "individual"
        ? await supabase
            .from("summary_feedback")
            .select("*")
            .eq("user_id", userId)
            .eq("query", querryTopic)
            .eq("file_id", FILEID)
        : await supabase
            .from("summary_feedback")
            .select("*")
            .eq("organization_id", orgId)
            .eq("query", querryTopic)
            .eq("file_id", FILEID);

    if (!error) {
      const existingFeedback = data;
      if (existingFeedback.length > 0) {
        const { data, error } = await supabase
          .from("summary_feedback")
          .update(payload)
          .eq("id", existingFeedback[0].id);
      } else {
        const { data, error } = await supabase
          .from("summary_feedback")
          .insert(payload);
      }
    }
  };
  // Dislike

  const disLikeHandler = async (response) => {
    setDisLike(true);
    setLikeFlag(false);
    const payload = {
      user_id: userId,
      organization_id: null,
      file_id: fileId || FILEID,
      query: response.query,
      feedback: "Dislike",
      summary_response: response.summary,
    };

    if (userRole !== "individual") {
      payload.organization_id = orgId;
    }

    const { data, error } =
      userRole === "individual"
        ? await supabase
            .from("summary_feedback")
            .select("*")
            .eq("user_id", userId)
            .eq("query", querryTopic)
            .eq("file_id", FILEID)
        : await supabase
            .from("summary_feedback")
            .select("*")
            .eq("organization_id", orgId)
            .eq("query", querryTopic)
            .eq("file_id", FILEID);

    if (!error) {
      const existingFeedback = data;
      if (existingFeedback.length > 0) {
        const { data, error } = await supabase
          .from("summary_feedback")
          .update(payload)
          .eq("id", existingFeedback[0].id);
      } else {
        const { data, error } = await supabase
          .from("summary_feedback")
          .insert(payload);
      }
    }
  };

  return (
    <>
      {dataNotFound ? (
        <Box
          padding={3}
          margin={"0 250px"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
          height={"100vh"}
        >
          <Box sx={{ fontSize: "30px", fontWeight: "600" }}>Data Not Found</Box>
          <Box>
            <CommonButton buttonName="Back" onClick={() => backHandler()} />
          </Box>
        </Box>
      ) : (
        <Box padding={3} margin={"0 250px"}>
          <Stack
            flexDirection={"row"}
            gap={2}
            alignItems={"center"}
            paddingX={3}
            marginBottom={3}
          >
            <Image
              src={query_stats}
              style={{ width: "40px", height: "40px" }}
            />
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ margin: "0" }}
            />
            <Box width={"100%"}>
              {/* {jsonData ? ( */}
              <Typography
                fontSize={"35px"}
                fontWeight={"500"}
                lineHeight={"37px"}
              >
                {querryTopic}
              </Typography>
            </Box>
            <Image
              src={close}
              onClick={() => backHandler()}
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
            {jsonData && (
              <>
                <Image
                  onClick={downloadPdf}
                  src={ios_share}
                  style={{ width: "40px", height: "40px", cursor: "pointer" }}
                />
              </>
            )}
          </Stack>
          <div>
            <Box maxWidth={"950px"} margin={"auto"} paddingY={4}>
              <Stack flexDirection={"row"} gap={"3px"}>
                <SouthEastIcon sx={{ color: "#7a52f4", marginTop: "2px" }} />
                {jsonData ? (
                  <Typography
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"#7a52f4"}
                  >
                    EXPLORING
                  </Typography>
                ) : (
                  <Skeleton animation="wave" width={"40%"} height={35} />
                )}
              </Stack>
              {jsonData ? (
                <Typography
                  fontSize={"25px"}
                  fontWeight={"600"}
                  lineHeight={"35px"}
                  marginBottom={1}
                >
                  "{jsonData.main_topic}"
                </Typography>
              ) : (
                <Skeleton animation="wave" width={"50%"} height={40} />
              )}
              {jsonData ? (
                <Typography
                  fontSize={"18px"}
                  fontWeight={"400"}
                  lineHeight={"25px"}
                  marginBottom={1}
                >
                  {jsonData.summary}
                </Typography>
              ) : (
                <>
                  <Skeleton animation="wave" width={"80%"} height={25} />
                  <Skeleton animation="wave" width={"100%"} height={25} />
                  <Skeleton animation="wave" width={"100%"} height={25} />
                  <Skeleton animation="wave" width={"60%"} height={25} />
                </>
              )}
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                padding={"15px 100px 0 50px"}
              >
                {!jsonData ? (
                  <Skeleton animation="wave" width={"100%"} height={40} />
                ) : (
                  <>
                    <Typography
                      fontSize={"16px"}
                      fontWeight={"600"}
                      lineHeight={"28px"}
                    >
                      Was this response helpful?
                    </Typography>
                    <Stack gap={"10px"} display={"flex"} flexDirection={"row"}>
                      {!likeFlag ? (
                        <ThumbUpOffAltIcon
                          sx={{ color: "#7a52f4" }}
                          onClick={() => likeHandler(jsonData)}
                        />
                      ) : (
                        <ThumbUpIcon
                          sx={{ color: "#7a52f4" }}
                          onClick={() => disLikeHandler(jsonData)}
                        />
                      )}
                      {!disLike ? (
                        <ThumbDownOffAltIcon
                          sx={{ color: "#7a52f4" }}
                          onClick={() => disLikeHandler(jsonData)}
                        />
                      ) : (
                        <ThumbDownIcon
                          sx={{ color: "#7a52f4" }}
                          onClick={() => likeHandler(jsonData)}
                        />
                      )}
                    </Stack>
                  </>
                )}
              </Stack>
            </Box>

            {subTopics &&
              Object.keys(subTopics).map((res, index) => {
                return (
                  <Box
                    maxWidth={"1050px"}
                    margin={"auto"}
                    paddingY={4}
                    key={index}
                  >
                    <Typography
                      fontSize={"20px"}
                      fontWeight={"600"}
                      color={"#7a52f4"}
                      marginBottom={"10px"}
                    >
                      {subTopics[res]?.key}
                    </Typography>
                    {subTopics[res] ? (
                      <Typography
                        fontSize={"18px"}
                        fontWeight={"500"}
                        lineHeight={"25px"}
                        marginBottom={1}
                        paddingX={2}
                      >
                        {subTopics[res]?.summary}
                      </Typography>
                    ) : (
                      <>
                        <Skeleton animation="wave" width={"80%"} height={25} />
                        <Skeleton animation="wave" width={"100%"} height={25} />
                        <Skeleton animation="wave" width={"100%"} height={25} />
                        <Skeleton animation="wave" width={"60%"} height={25} />
                      </>
                    )}
                    <Stack
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      paddingX={5}
                      gap={2}
                      key={res}
                    >
                      <Image
                        src={quoteleft}
                        style={{
                          width: "25px",
                          height: "25px",
                          alignSelf: "flex-start",
                        }}
                      />
                      <Typography
                        fontSize={"16px"}
                        paddingY={2}
                        fontWeight={"400"}
                        lineHeight={"25px"}
                      >
                        <i>{subTopics[res]?.docs[0]}</i>
                      </Typography>
                      <Image
                        src={quoteright}
                        style={{
                          width: "25px",
                          height: "25px",
                          alignSelf: "flex-end",
                        }}
                      />
                    </Stack>
                    {/* ); */}
                    {/* })} */}
                  </Box>
                );
              })}
            {/* Add a skeleton loader for the subtopics if subTopics is null */}

            {!jsonData && (
              <>
                <Box maxWidth={"1050px"} margin={"auto"} paddingY={3}>
                  <Skeleton animation="wave" width={"70%"} height={35} />
                  <Skeleton animation="wave" width={"80%"} height={25} />
                  <Skeleton animation="wave" width={"100%"} height={25} />
                  <Skeleton animation="wave" width={"80%"} height={25} />
                  <Skeleton animation="wave" width={"100%"} height={25} />
                </Box>
                <Box maxWidth={"1050px"} margin={"auto"} paddingY={3}>
                  <Skeleton animation="wave" width={"70%"} height={35} />
                  <Skeleton animation="wave" width={"80%"} height={25} />
                  <Skeleton animation="wave" width={"100%"} height={25} />
                  <Skeleton animation="wave" width={"80%"} height={25} />
                  <Skeleton animation="wave" width={"100%"} height={25} />
                </Box>
                <Box maxWidth={"1050px"} margin={"auto"} paddingY={3}>
                  <Skeleton animation="wave" width={"70%"} height={35} />
                  <Skeleton animation="wave" width={"80%"} height={25} />
                  <Skeleton animation="wave" width={"100%"} height={25} />
                  <Skeleton animation="wave" width={"80%"} height={25} />
                  <Skeleton animation="wave" width={"100%"} height={25} />
                </Box>
              </>
            )}
          </div>
        </Box>
      )}
    </>
  );
}

export default WithAuth(AskCynthiaDetails);
