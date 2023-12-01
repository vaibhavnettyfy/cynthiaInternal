"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  Pagination,
  Paper,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextField,
  Popover,
} from "@mui/material";
import {
  StyledTableCell,
  StyledChip,
  StyledTableRow,
  useStyles,
  getInvoiceStatus,
} from "@/helper/theme";
import Link from "next/link";
import CommonButton from "@/components/common/Button";
import Image from "next/image";
import { Edit, Profileimage } from "@/helper/constant";
import AddIcon from "@mui/icons-material/Add";
import CommonModal from "@/components/common/Modal";
import { supabase } from "@/Client";
import { setIndividualHandler } from "@/service/comman.service";
import { errorNotification, successNotification } from "@/helper/Notification";
const Members = () => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    currentComponent: "",
  });
  const [members, setMembers] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const EditClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [userDetails, setUserDetails] = React.useState({});

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  let userRole = "";
  let userId = "";
  let orgId = "";

  if (typeof window !== "undefined") {
    userRole = localStorage.getItem("userRole");
    userId = localStorage.getItem("userId");
    orgId = localStorage.getItem("orgId");
  }

  useEffect(() => {
    if (orgId) {
      memberList();
      orgNamehandler();
    }
  }, [orgId]);

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
    userRole = localStorage.getItem("userRole");
    orgId = localStorage.getItem("orgId");
  }

  const orgNamehandler = async () => {
    if (userId) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId);
      setUserDetails(data[0]);
      if (error) {
        errorNotification(error.message || "Something went wrong");
      }
    } else {
      router.push(`/`);
      // errorNotification(error.message || "Something went wrong");
    }
  };

  const removeUserHandler = async (id) => {
    const payload = {
      user_id: id,
    };
    const { data, message, success } = await setIndividualHandler(
      "member",
      payload
    );
    if (success) {
      successNotification(message);
      memberList();
    } else {
      errorNotification(message);
    }
  };

  const searchDataHandler = async (value) => {
    const { data, error } = await supabase
      .from("organization_members")
      .select("*")
      .eq("organization_id", orgId)
      .textSearch("name", value);
    if (!error) {
      setMembers(data || []);
    }
  };

  const searchHandler = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue.length >= 2) {
      searchDataHandler(trimmedValue);
    } else {
      memberList();
    }
  };

  const memberList = async () => {
    if (typeof window !== "undefined") {
      try {
        const { data, error } = await supabase
          .from("organization_members")
          .select("*")
          .eq("organization_id", orgId);

        if (error) {
          console.error("Error fetching organization members:", error);
        } else {
          setMembers(data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <Box>
      <Typography
        fontSize={"30px"}
        fontWeight={"600"}
        lineHeight={"30px"}
        marginBottom={2}
        marginLeft={3}
      >
        Members
      </Typography>
      <Divider />
      <Box>
        <Stack
          marginBottom={1}
          marginTop={3}
          marginX={4}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={"22px"} fontWeight={"700"} lineHeight={"30px"}>
            {userDetails?.organization_name}
          </Typography>
          <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
            <TextField
              hiddenLabel
              className="search_field"
              placeholder="Search"
              onChange={(event) => searchHandler(event.target.value)}
              sx={{ width: { xs: "100%", sm: "unset" } }}
            />
            <CommonButton
              buttonName="Add User"
              muiIcon={<AddIcon sx={{ width: "20px", height: "20px" }} />}
              style={{ borderRadius: "5px" }}
              onClick={() =>
                setIsModalOpen({
                  open: true,
                  currentComponent: "inviteMember",
                })
              }
            />
          </Stack>
        </Stack>
        <Box marginY={2} marginX={3}>
          <Divider />
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email Address</StyledTableCell>
                  <StyledTableCell>Usage</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members &&
                  members.length > 0 &&
                  members.map((response) => {
                    console.log("response",response);
                    return (
                      <StyledTableRow sx={{ cursor: "pointer" }}>
                        <TableCell component="th" scope="row">
                          <Stack
                            flexDirection={"row"}
                            gap={1}
                            alignItems={"center"}
                          >
                            {/* <Image
                              src={Profileimage}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "5px",
                              }}
                            ></Image> */}
                            <Box
                              sx={{
                                background: "#7a52f4",
                                color: "#fff",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight:'700',
                                marginRight:'5px'
                              }}
                            >
                              {response.name.charAt(0)}
                            </Box>
                            <Stack>
                              <Typography
                                fontSize={"18px"}
                                fontWeight={600}
                                lineHeight={"25px"}
                              >
                                {response.name}
                              </Typography>
                              {/* <Typography fontSize={"14px"} lineHeight={"15px"}>
                                Product Manager
                              </Typography> */}
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Stack alignItems={"center"}>
                            <Typography
                              fontSize={"14px"}
                              lineHeight={"25px"}
                              color={"#5d5d5b"}
                              sx={{ textDecoration: "underline" }}
                            >
                              {response.email}
                            </Typography>
                            <Typography
                              fontSize={"13px"}
                              lineHeight={"20px"}
                              color={"#7a52f4"}
                              fontWeight={500}
                            >
                              {response.status.toUpperCase()}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {response.usage
                            ? response.usage === 0
                              ? "N/A"
                              : response.usage
                            : "N/A"}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Stack
                            flexDirection={"row"}
                            gap={1}
                            justifyContent={"center"}
                          >
                            <CommonButton
                              icon={Edit}
                              onClick={EditClick}
                              iconWidth="20"
                              variant="text"
                              style={{ borderRadius: "5px", minWidth: "22px" }}
                            />
                            <Popover
                              // id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <Typography sx={{ p: 2 }}>
                                {response.role}
                              </Typography>
                            </Popover>
                            <CommonButton
                              buttonName="Remove"
                              style={{
                                borderRadius: "5px",
                                padding: "7px 15px",
                              }}
                              onClick={() =>
                                removeUserHandler(response.user_id)
                              }
                            />
                          </Stack>
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
                {members.length === 0 && (
                  <TableRow>
                    <TableCell
                      sx={{
                        color: "silver",
                        textAlign: "center",
                        paddingTop: "90px",
                        borderBottom: "none",
                        fontSize: "30px",
                      }}
                      colSpan="6"
                    >
                      No records to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <CommonModal
        modalOpen={isModalOpen}
        handleClose={() =>
          setIsModalOpen({ open: false, currentComponent: "" })
        }
      />
    </Box>
  );
};

export default Members;
