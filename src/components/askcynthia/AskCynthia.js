"use client";
import { Box, Menu, MenuItem, Select, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Image from "next/image";
import {
  SelectAppstore,
  SelectCsv,
  SelectIntercom,
  SelectPlaystore,
  SelectSalesforce,
  SelectZendesk,
  helpOutline,
} from "@/helper/constant";
import Result from "./Result";
import CommonModal from "../common/Modal";
import { supabase } from "@/Client";
import { errorNotification, successNotification } from "@/helper/Notification";
import { searchQuerryHandle } from "@/service/askCynthia.service";
import { useRouter } from "next/navigation";
import WithAuth from "../WithAuth";
import { ASKCYNTHIA, EventEmitter, checkFeatures } from "@/helper";
import AskCynthiaDetails from "./AskCynthiaDetails";
import * as amplitude from '@amplitude/analytics-browser';

const selectDateList = [
  { name: "19 Jul - 19 Aug 23", value: "1", sideList: "0 reviews" },
  { name: "19 Aug - 19 Sept 23", value: "2", sideList: "0 reviews" },
  { name: "19 Sept - 19 Oct 23", value: "3", sideList: "0 reviews" },
  { name: "19 Oct - 19 Nov 23", value: "4", sideList: "0 reviews" },
];

const selectAppList = [
  { icon: SelectCsv, name: "CSV", value: "CSV" },
  { icon: SelectPlaystore, name: "Play Store", value: "playStore" },
  { icon: SelectAppstore, name: "App Store", value: "appStore" },
  { icon: SelectZendesk, name: "Zendesk", value: "zendesk" },
  { icon: SelectIntercom, name: "Intercom", value: "intercom" },
  { icon: SelectSalesforce, name: "Salesforce", value: "salesforce" },
];

const AskCynthia = () => {
  const amplitudekey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
  amplitude.init(amplitudekey);
  const textareaRef = useRef(null);
  const [info, setInfo] = useState(null);
  const [ShowResult, setShowResult] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [search, setSearch] = useState("");
  const [savedQueries, setSavedQueries] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [selectSource, setSelectSource] = useState("CSV");
  const [fileId, setFileId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [fileName, setFileName] = useState(null);
  const [detailsFlag,setDetailsFlag] = useState(false);
  const [querryDetails,setQuerryDetails] = useState(null);
  const [querryId,setQuerryId] = useState(null);
  const [querryTopic,setQuerryTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    currentComponent: "",
    data: null,
  });
  const router = useRouter();

  const handleShowIcon = (e) => {
    setShowIcon(true);
  };

  const handleHideIcon = () => {
    setShowIcon(false);
  };

  useEffect(() => {
    checkHandler();
  }, [])

  EventEmitter.subscribe('askCynthia',res =>{
    setDetailsFlag(false);
  })

  const checkHandler = async () => {
    const { status, message } = await checkFeatures(ASKCYNTHIA);
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
    // Add a click event listener to the document to handle clicks outside the textarea
    function handleClickOutside(event) {
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        handleHideIcon();
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickProfile = (event) => {
    setInfo(event.currentTarget);
  };

  const saveQuerryHandler = async (fileId) => {
    const { data, error } = await supabase
      .from("saved_queries")
      .select("*")
      .eq("file_id", fileId)
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) {
      setSavedQueries(data);
    }
    if (error) {
      errorNotification(error.message);
    }
  };

  // after select source user will select particular file
  const fileIdHandler = (fileNumber, child) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fileNumber", fileNumber);
      localStorage.setItem("fileName", child.props.orgFileName);
    }
    setFileId(fileNumber);
    setFileName(child.props.orgFileName);
    // based on select file we will fecth data saved_queries Table (fileid)
    if (typeof window !== "undefined") {
      localStorage.setItem("fileId", fileNumber);
    }
    saveQuerryHandler(fileNumber);
  };

  const sourceDataHandler = async (source) => {
    try {
      // we are doing fileId null because they selecting new source
      // setFileId(null);
      const { data, error } = await supabase
        .from("csv_files")
        .select("*")
        .eq("source", source).order("upload_timestamp", { ascending: false });
      // we will store data of selected source
      if (error) {
        console.log("error", error);
      } else {
        setSourceList(data);
        const userFileId = localStorage.getItem("fileNumber")
        if (!userFileId && data.length > 0) {
          if (typeof window !== "undefined") {
            localStorage.setItem("fileNumber", data[0].id)
            localStorage.setItem("fileName", data[0].original_filename)
            localStorage.setItem("fileId", data[0].id);
            setFileId(data[0].id);
            setFileName(data[0].original_filename);
            saveQuerryHandler(data[0].id);
          }
        }

        // if table & selected source have no data than redertic to admin 
        if (data.length === 0) {
          // need to check if they have no data than we have to redertic
          const { data, error } = await supabase.from("csv_files").select("*");
          if (data.length === 0) {
            router.push(`/admin/uploadintegration`);
          }
        }
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const handleCloseProfile = () => {
    setInfo(null);
    setShowIcon(false);
  };



  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleDivClick = (event) => {
    // Prevent the click event on the div
    event.stopPropagation();
    event.preventDefault();
  };





  useEffect(() => {
    if (selectSource) {
      localStorage.setItem("selectSource", selectSource);
      sourceDataHandler(selectSource);
    }
    if (localStorage.getItem("fileNumber")) {
      setFileId(localStorage.getItem("fileNumber"));
      saveQuerryHandler(localStorage.getItem("fileNumber"));
    }
    if (localStorage.getItem("fileName")) {
      setFileName(localStorage.getItem("fileName"));
    }
  }, [isModalOpen.open]);



  const onMouseUp = (res) => {
    const payload = {
      status : true,
      data : res,
      id : res.id
    }
    setDetailsFlag(true);
    setQuerryDetails(null);
    // setQuerryDetails(res);
    setQuerryId(res.id)
    setQuerryTopic(res.query)
    // router.push(`/admin/askcynthia/details`);
    EventEmitter.dispatch('askCynthiaDetails',payload);
  };

  // when user Click on particular source
  const sourceHandler = (source) => {
    setSelectSource(source);
    const eventpayload = {
      source_name : source
    }
    amplitude.track("Source Changed",eventpayload)
    setSavedQueries([]);
    // we will get data of source which is selected
    sourceDataHandler(source);
  };

  const searchKeyHandler = (keyCode) => {
    if (keyCode === 13) {
      handleSearchapiCall();
    }
  };

  const handleSearchapiCall = async () => {
    if (fileId) {
      if (search.trim() !== "") {
        // setLoading(true);
        setDetailsFlag(true);
        const payload = {
          query: search,
          file_id: fileId.toString(),
        };
        setQuerryTopic(search)
        try {
          setQuerryDetails(null);
          setQuerryId(null);
          const { data, message, success } = await searchQuerryHandle(payload);
          if (success) {
            // setDetailsFlag(true);
            setQuerryDetails(data);
            // setLoading(false);
            saveQuerryHandler(fileId);
          } else {
            // setLoading(false);
            setDetailsFlag(false);
            errorNotification(message);
          }
        } catch (error) {
          // setLoading(false);
          errorNotification("An error occurred while making the search query.");
          console.error(error); // Log the error for debugging purposes
        }
      }
    } else {
      errorNotification("Please Select Source and File First");
    }
  };

  const backHandler = () =>{
    setDetailsFlag(false);
    saveQuerryHandler(localStorage.getItem("fileNumber"));
  }

  
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleOpen = () => {
    setIsSelectOpen(true);
    document.body.classList.add('select_csv'); // Add your class to the body element
  };

  const handleClose = () => {
    setIsSelectOpen(false);
    document.body.classList.remove('select_csv'); // Remove your class from the body element
  };

  return (
    <Box>
      {!detailsFlag && (
        <>
          <Stack
            padding={"24px 24px 0"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ position: "relative", zIndex: "1000", background: "#fff" }}
          >
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={2}
            >
              <Box width={"240px"}>
                <Select
                  displayEmpty
                  fullWidth
                  width="250px"
                  value={fileId}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  }}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  onChange={(event, child) =>
                    fileIdHandler(event.target.value, child)
                  }
                  className="select_askcynthia"
                >
                  {sourceList.map((res) => {
                    return (
                      <MenuItem
                        value={res.id}
                        orgFileName={res.original_filename}
                      >
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          width={"300px"}
                          alignItems={"center"}
                        >
                          <Typography fontSize={"15px"}>
                            {res.original_filename}
                          </Typography>
                          <Typography fontSize={"10px"}>
                            {res.row_count} reviews
                          </Typography>
                        </Stack>
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>

              {fileId && (
                <>
                  <Typography
                    style={{
                      fontWeight: "600",
                      fontSize: "13px",
                      cursor: "pointer",
                      color: "#7a52f4",
                    }}
                    onClick={() =>
                      setIsModalOpen({
                        open: true,
                        currentComponent: "remove",
                        data: {
                          fileName: fileName,
                          fileId: fileId,
                        },
                      })
                    }
                  >
                    Remove
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: "600",
                      fontSize: "13px",
                      cursor: "pointer",
                      color: "#7a52f4",
                    }}
                    onClick={() =>
                      setIsModalOpen({
                        open: true,
                        currentComponent: "editFile",
                        data: {
                          fileName: fileName,
                          fileId: fileId,
                        },
                      })
                    }
                  >
                    Edit
                  </Typography>
                </>
              )}
            </Stack>
            <Select
              displayEmpty
              fullWidth
              value={selectSource}
              className="select_askcynthia"
              sx={{
                fontSize: { xs: "12px", sm: "16px" },
                color: "#a4a4a4",
                width: "240px",
              }}
              onChange={(event) => sourceHandler(event.target.value)}
            >
              <MenuItem value="" hidden disabled>
                Select
              </MenuItem>
              {selectAppList.map((res) => {
                return (
                  <MenuItem value={res.value}>
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      gap={"10px"}
                      width={"300px"}
                      alignItems={"center"}
                    >
                      <Image
                        src={res.icon}
                        style={{
                          width: "25px",
                          height: "25px",
                          objectFit: "contain",
                        }}
                      />
                      <Typography> {res.name} </Typography>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
          <Box
            padding={3}
            height={"calc(100vh - 100px)"}
            display={"flex"}
            justifyContent={"center"}
            width={"fit-content"}
            margin={"auto"}
            flexDirection={"column"}
          >
            <Box>
              <div
                className="p_relative"
                style={{ width: "fit-content" }}
                ref={textareaRef}
              >
                <TextareaAutosize
                  rows={2}
                  placeholder="Ask Cynthia..."
                  className="input_askcynthia"
                  onFocus={handleShowIcon}
                  style={{
                    lineHeight: `${search == "" ? "55px" : "45px"}`,
                  }}
                  onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                      event.preventDefault(); // Prevent the default "Enter" key behavior
                    }
                    searchKeyHandler(event.keyCode);
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />

                {showIcon && (
                  <div
                    onClick={() =>
                      setIsModalOpen({
                        open: true,
                        currentComponent: "infoCynthia",
                      })
                    }
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "30px",
                      zIndex: "999",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      src={helpOutline}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                )}
              </div>
              <div onClick={handleDivClick}>
                <Menu
                  anchorEl={info}
                  open={Boolean(info)}
                  onClose={handleCloseProfile}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  className="ask_cynthia_info"
                >
                  <div>Info</div>
                </Menu>
              </div>
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

            <Box
              marginTop={5}
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              marginLeft={8}
            >
              {
                savedQueries.length > 0 &&
                <Typography
                  fontSize={"30px"}
                  fontWeight={"500"}
                  color={"#c2c2c2"}
                  sx={{ fontStyle: "italic" }}
                >
                  {loading ? <Skeleton animation="wave" width={'50%'} height={35} />
                    : ' Recently Explored.'}
                </Typography>
              }
              {
                !savedQueries.length > 0 && loading &&
                <>
                  <Skeleton animation="wave" width={'50%'} height={35} />
                  <Box marginTop={1} marginLeft={3}>
                    <Skeleton animation="wave" width={'800px'} height={35} />
                    <Skeleton animation="wave" width={'800px'} height={35} />
                    <Skeleton animation="wave" width={'800px'} height={35} />
                    <Skeleton animation="wave" width={'800px'} height={35} />
                  </Box>
                </>
              }
              <Box marginTop={1} marginLeft={3}>
                {savedQueries.map((res) => {
                  return (
                    <Box position={"relative"} width={"fit-content"}>
                      {loading ?
                        <>
                          <Skeleton animation="wave" width={'800px'} height={35} />
                        </> :
                        <Typography
                          onMouseUp={() => onMouseUp(res)}
                          sx={{ cursor: "pointer", fontStyle: "italic" }}
                          fontSize={"30px"}
                          fontWeight={"500"}
                          color={"#eeeeee"}
                          lineHeight={"50px"}
                          className="ask_cynthia_para"
                        >
                          {res.query}
                        </Typography>}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </>
      )}
      {detailsFlag && <AskCynthiaDetails querryId={querryId} detailFlag={backHandler} querryDetails={querryDetails} querryTopic={querryTopic}/>}
    </Box>
  );
};

export default AskCynthia;