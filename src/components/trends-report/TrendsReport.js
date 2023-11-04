"use client";
import React, { useEffect } from "react";
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

const TrendsReport = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [compliments, setCompliments] = React.useState(false);
  const [complimentsList, setComplimentsList] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  let fileId = ""


  if (typeof window !== 'undefined') {
    fileId = localStorage.getItem("fileId");
  }
  useEffect(() => {
    if(fileId){
      complimentsListHandler();
    }
  }, []);

  const handleComplimentsClick = () => setCompliments((show) => !show);

  const handleComplimentsClose = () => {
    setCompliments(false);
  };

  const complimentsListHandler = async () => {
    try {
      const { data, error } = await supabase.from("topics_summary").select("*").eq("file_id",fileId)
      setComplimentsList(data);
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
        return "Top Feedbacks";
      case 1:
        if (compliments) {
          return <Compliments complimentsList={complimentsList} />;
        }
        return null;
      case 2:
        return "Complaints";
      case 3:
        return "Requests";
      case 4:
        return "Questions";
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
            onClick={() => [handleComplimentsClose(), setSelectedTab(0)]}
          />
          <Tab
            label="Compliments"
            onClick={() => [handleComplimentsClick(), setSelectedTab(1)]}
          />
          {complimentsList.length > 0 && (
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
                        return (
                          <Box marginRight={"10px"}>
                            <Stack
                              padding={"12px 5px"}
                              key={i}
                              flexDirection={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              gap={2}
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
            onClick={() => [handleComplimentsClose(), setSelectedTab(2)]}
          />
          <Tab
            label="Requests"
            onClick={() => [handleComplimentsClose(), setSelectedTab(3)]}
          />
          <Tab
            label="Questions"
            onClick={() => [handleComplimentsClose(), setSelectedTab(4)]}
          />
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
    </Box>
  );
};

export default WithAuth(TrendsReport);
