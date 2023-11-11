"use client";
import React, { useState,useEffect } from "react";
import {
  Tabs,
  Tab,
  Paper,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import CommonInput from "../common/Input";
import SearchIcon from "@mui/icons-material/Search";
import Compliments from "./sections/Compliments";
import { supabase } from "@/Client";
import WithAuth from "../WithAuth";
import ReportDetails from "./sections/ReportDetails";
import { COMPLAINTS, COMPLIMENTS, QUESTIONS, REQUESTS, TOPFEEDBACK, TRENDSREPORT, checkFeatures } from "@/helper";
import CommonModal from "../common/Modal";

const TrendsReport = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [reportData,setReportData] = React.useState([]);

  const [compliments, setCompliments] = React.useState(false);
  const [complimentsList, setComplimentsList] = React.useState([]);
  const [complimentsDetails,setCompolimentDetails] = React.useState([]);

  // top Feedback 
  const [topFeedBack, setTopFeedBack] = React.useState(true);
  const [TopFeedBackList, setTopFeedBackList] = React.useState([]);
  const [TopFeedBackDetails,setTopFeedBackDetails] = React.useState([]);

  // Complaints
  const [complaints, setComplaints] = React.useState(false);
  const [complaintsList, setComplaintsList] = React.useState([]);
  const [complaintsDetails,setComplaintsDetails] = React.useState([]);

  // Requests
  const [requests, setRequests] = React.useState(false);
  const [requestsList, setRequestsList] = React.useState([]);
  const [requestsDetails,setRequestDetails] = React.useState([]);

  // Questions
  const [questions, setQuestions] = React.useState(false);
  const [questionList, setQuestionList] = React.useState([]);
  const [questionDetails,setQuestionDetails] = React.useState([]);

  const [searchText, setSearchText] = React.useState("");
  const [selectedText,setSelectedText] = React.useState("");

  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    currentComponent: "",
    data: null,
  });

  let fileId = "";

  if (typeof window !== "undefined") {
    fileId = localStorage.getItem("fileId");
  }


  useEffect(() => {
    checkHandler();
  }, [])

  const checkHandler = async () => {
    const { status, message } = await checkFeatures(TRENDSREPORT);
    if (!status) {
      setIsModalOpen({
        open: true,
        currentComponent: "checkFeature",
        data:{
          message,
        }
      })
    }
  };

  useEffect(() => {
    if (fileId) {
      complimentsListHandler();
    }
  }, []);

  // const handleComplimentsClick = () => setCompliments((show) => !show);

  const handleComplimentsClick = () => {
    complimentsListHandler(fileId);
    setCompliments((show) => !show);
    setTopFeedBack(false);
    setComplaints(false);
    setRequests(false);
    setQuestions(false);
  }
  
  const handleTopFeedBackClick = () => {
    complimentsListHandler(fileId);
    setCompliments(false);
    setTopFeedBack((show) => !show);
    setComplaints(false);
    setRequests(false);
    setQuestions(false);
  }
  
  const handleComplaintsClick = () => {
    complimentsListHandler(fileId);
    setCompliments(false);
    setTopFeedBack(false);
    setComplaints((show) => !show);
    setRequests(false);
    setQuestions(false);
  }
  
  const handleRequestClick = () => {
    setCompliments(false);
    setTopFeedBack(false);
    setComplaints(false);
    setRequests((show) => !show);
    setQuestions(false);
  }
  
  const handleQuestionClick = () => {
    setCompliments(false);
    setTopFeedBack(false);
    setComplaints(false);
    setRequests(false);
    setQuestions((show) => !show);
  }

  const complimentsListHandler = async () => {
    try {
      const { data, error } = await supabase
        .from("topics_summary")
        .select("*")
        .eq("file_id", fileId);
        setSelectedText("");
        const topFeedBackdata = data.filter((res)=>res.topic_type === TOPFEEDBACK);
        const complimentsData = data.filter((res)=>res.topic_type === COMPLIMENTS);
        const complaintData = data.filter((res)=> res.topic_type === COMPLAINTS);
        const requestData = data.filter((res) => res.topic_type === REQUESTS);
        const questionData = data.filter((res)=>res.topic_type === QUESTIONS);

        // Top FeedBack 
        setTopFeedBackDetails(topFeedBackdata);
        setTopFeedBackList(topFeedBackdata);
        // complaint Data 
        setComplaintsList(complaintData);
        setComplaintsDetails(complaintData);
        // compliments
        setComplimentsList(complimentsData);
        setCompolimentDetails(complimentsData);
        // request
        setRequestsList(requestData);
        setRequestDetails(requestData);
        // questions
        setQuestionList(questionData);
        setQuestionDetails(questionData);


        // const complimentData = data.filter((data) => )

      // setComplimentsList(data);
      if (error) {
        console.error("Error:", error);
        setComplimentsList([]);
      }
    } catch (e) {
      setComplimentsList([]);
      console.error("An error occurred:", e);
    }
  };

  const searchHandler = (event) => {
    setSearchText(event.target.value);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        if(topFeedBack){
          return <ReportDetails data={TopFeedBackDetails}  name="Top Feedback"/>;
        }
        return null;
      case 1:
        if (compliments) {
          return <ReportDetails data={complimentsDetails}  name="Compliments"/>;
        }
        return null;
      case 2:
        if(complaints){
          return <ReportDetails data={complaintsDetails}  name="Complaints"/>
        }
        return null;
      case 3:
        if(requests){
          return <ReportDetails data={requestsDetails}  name="Requests"/>
        }
        return null;
      case 4:
        if(questions){
          return <ReportDetails data={questionDetails} name="Questions"/>
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <Box height={"100vh"} display={"flex"} sx={{ overflow: "hidden" }}>
      <Paper elevation={3} style={{ width: "350px" }}>
        <Box padding={3}>
          <Typography fontSize={"25px"} fontWeight={"700"} lineHeight={"35px"}>
            Trends & Reports
          </Typography>
        </Box>
        <Tabs
          orientation="vertical"
          value={selectedTab}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            label="Top Feedbacks"
            onClick={() => [handleTopFeedBackClick(), setSelectedTab(0)]}
          />
          {
            topFeedBack && TopFeedBackList.length > 0 && (
              <Box padding={"0 24px"} width={"100%"}>
              <CommonInput
                placeholder="Search Theme"
                onChange={searchHandler}
                iconsInput={<SearchIcon />}
              />
              <Stack
                height={"calc(100vh - 390px)"}
                overflow={"auto"}
                margin={"10px 0"}
              >
                {TopFeedBackList.length === 0 ? (
                  <Typography> No data found</Typography>
                ) : (
                  <>
                    {TopFeedBackList
                      .filter((res) =>
                        res.topic
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((data, i) => {
                        const isSelected = selectedText && selectedText.topic === data.topic;
                        return (
                          <Box marginRight={"10px"}>
                            <Stack
                              padding={"12px 5px"}
                              key={i}
                              flexDirection={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              gap={2}
                              style={{cursor:"pointer",fontWeight: isSelected ? 'bold' : 'normal'}}
                              onClick={()=> { 
                                setSelectedText(data);
                                setTopFeedBackDetails([data])
                              }}
                            >
                              <i
                                style={{
                                  overflowWrap: "anywhere",
                                  fontSize: "12px",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {data.topic}
                              </i>
                              <Typography
                                fontSize={"12px"}
                                width={"30px"}
                                textAlign={"end"}
                              >
                                {data.count}
                              </Typography>
                            </Stack>
                            <Divider />
                          </Box>
                        );
                      })}
                  </>
                )}
              </Stack>
            </Box>
            )
          }
          <Tab
            label="Compliments"
            onClick={() => [handleComplimentsClick(), setSelectedTab(1)]}
          />
          {compliments && complimentsList.length > 0 && (
            
            <Box padding={"0 24px"} width={"100%"}>
              <CommonInput
                placeholder="Search Theme"
                onChange={searchHandler}
                iconsInput={<SearchIcon />}
              />
              <Stack
                height={"calc(100vh - 390px)"}
                overflow={"auto"}
                margin={"10px 0"}
              >
                {complimentsList.length === 0 ? (
                  <Typography> No data found</Typography>
                ) : (
                  <>
                    {complimentsList
                      .filter((res) =>
                        res.topic
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((data, i) => {
                        const isSelected = selectedText && selectedText.topic === data.topic;
                        return (
                          <Box marginRight={"10px"}>
                            <Stack
                              padding={"12px 5px"}
                              key={i}
                              flexDirection={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              gap={2}
                              style={{cursor:"pointer",fontWeight: isSelected ? 'bold' : 'normal'}}
                              onClick={()=> { 
                                setSelectedText(data);
                                setCompolimentDetails([data])
                              }}
                            >
                              <i
                                style={{
                                  overflowWrap: "anywhere",
                                  fontSize: "12px",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {data.topic}
                              </i>
                              <Typography
                                fontSize={"12px"}
                                width={"30px"}
                                textAlign={"end"}
                              >
                                {data.count}
                              </Typography>
                            </Stack>
                            <Divider />
                          </Box>
                        );
                      })}
                  </>
                )}
              </Stack>
            </Box>
          )}
          <Tab
            label="Complaints"
            onClick={() => [handleComplaintsClick(), setSelectedTab(2)]}
          /> 
          {
            complaints && complaintsList.length > 0 && (
              <Box padding={"0 24px"} width={"100%"}>
              <CommonInput
                placeholder="Search Theme"
                onChange={searchHandler}
                iconsInput={<SearchIcon />}
              />
              <Stack
                height={"calc(100vh - 390px)"}
                overflow={"auto"}
                margin={"10px 0"}
              >
                {complaintsList.length === 0 ? (
                  <Typography> No data found</Typography>
                ) : (
                  <>
                    {complaintsList
                      .filter((res) =>
                        res.topic
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((data, i) => {
                        const isSelected = selectedText && selectedText.topic === data.topic;
                        return (
                          <Box marginRight={"10px"}>
                            <Stack
                              padding={"12px 5px"}
                              key={i}
                              flexDirection={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              gap={2}
                              style={{cursor:"pointer",fontWeight: isSelected ? 'bold' : 'normal'}}
                              onClick={()=> { 
                                setSelectedText(data);
                                setComplaintsDetails([data])
                              }}
                            >
                              <i
                                style={{
                                  overflowWrap: "anywhere",
                                  fontSize: "12px",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {data.topic}
                              </i>
                              <Typography
                                fontSize={"12px"}
                                width={"30px"}
                                textAlign={"end"}
                              >
                                {data.count}
                              </Typography>
                            </Stack>
                            <Divider />
                          </Box>
                        );
                      })}
                  </>
                )}
              </Stack>
            </Box>
            )
          }

          <Tab
            label="Requests"
            onClick={() => [handleRequestClick(), setSelectedTab(3)]}
          />
          {
            requests && requestsList.length > 0 && (
              <Box padding={"0 24px"} width={"100%"}>
              <CommonInput
                placeholder="Search Theme"
                onChange={searchHandler}
                iconsInput={<SearchIcon />}
              />
              <Stack
                height={"calc(100vh - 390px)"}
                overflow={"auto"}
                margin={"10px 0"}
              >
                {requestsList.length === 0 ? (
                  <Typography> No data found</Typography>
                ) : (
                  <>
                    {requestsList
                      .filter((res) =>
                        res.topic
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((data, i) => {
                        const isSelected = selectedText && selectedText.topic === data.topic;
                        return (
                          <Box marginRight={"10px"}>
                            <Stack
                              padding={"12px 5px"}
                              key={i}
                              flexDirection={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              gap={2}
                              style={{cursor:"pointer",fontWeight: isSelected ? 'bold' : 'normal'}}
                              onClick={()=> { 
                                setSelectedText(data);
                                setRequestDetails([data])
                              }}
                            >
                              <i
                                style={{
                                  overflowWrap: "anywhere",
                                  fontSize: "12px",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {data.topic}
                              </i>
                              <Typography
                                fontSize={"12px"}
                                width={"30px"}
                                textAlign={"end"}
                              >
                                {data.count}
                              </Typography>
                            </Stack>
                            <Divider />
                          </Box>
                        );
                      })}
                  </>
                )}
              </Stack>
            </Box>
            )
          }
          <Tab
            label="Questions"
            onClick={() => [handleQuestionClick(), setSelectedTab(4)]}
          />
          {
            questions && questionList.length > 0 && (
              <Box padding={"0 24px"} width={"100%"}>
              <CommonInput
                placeholder="Search Theme"
                onChange={searchHandler}
                iconsInput={<SearchIcon />}
              />
              <Stack
                height={"calc(100vh - 390px)"}
                overflow={"auto"}
                margin={"10px 0"}
              >
                {questionList.length === 0 ? (
                  <Typography> No data found</Typography>
                ) : (
                  <>
                    {questionList
                      .filter((res) =>
                        res.topic
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((data, i) => {
                        const isSelected = selectedText && selectedText.topic === data.topic;
                        return (
                          <Box marginRight={"10px"}>
                            <Stack
                              padding={"12px 5px"}
                              key={i}
                              flexDirection={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              gap={2}
                              style={{cursor:"pointer",fontWeight: isSelected ? 'bold' : 'normal'}}
                              onClick={()=> { 
                                setSelectedText(data);
                                setQuestionDetails([data])
                              }}
                            >
                              <i
                                style={{
                                  overflowWrap: "anywhere",
                                  fontSize: "12px",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {data.topic}
                              </i>
                              <Typography
                                fontSize={"12px"}
                                width={"30px"}
                                textAlign={"end"}
                              >
                                {data.count}
                              </Typography>
                            </Stack>
                            <Divider />
                          </Box>
                        );
                      })}
                  </>
                )}
              </Stack>
            </Box>
            )
          }
        </Tabs>
      </Paper>

      <Box
        padding={3}
        width={"calc(100vw - 350px)"}
        height={"100%"}
        sx={{ overflow: "auto" }}
        className="inputbox"
      >
        {renderTabContent()}
      </Box>
      <CommonModal
                modalOpen={isModalOpen}
                handleClose={() =>
                  setIsModalOpen({
                    open: false,
                    currentComponent: "",
                    data: null,
                  })
                }
              />
    </Box>
  );
};

export default WithAuth(TrendsReport);
