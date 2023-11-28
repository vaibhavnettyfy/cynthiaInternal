"use client"
import CommonButton from "@/components/common/Button";
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  StyledTableCell,
  StyledChip,
  StyledTableRow,
  useStyles,
  getInvoiceStatus,
} from "@/helper/theme";
import CommonInput from "@/components/common/Input";
import { supabase } from "@/Client";
import { errorNotification } from "@/helper/Notification";
import moment from 'moment';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const Usage = () => {
  const classes = useStyles();

  var status = getInvoiceStatus(true);

  const [switchState, setSwitchState] = useState(false);
  //  usageDetails
  const [usageDetails, setUsageDetails] = useState("");
  const [reviewUsage, setReviewUsage] = useState("");

  const [usageBasedPricing, setUsageBasedPricing] = useState(false);
  const [approvedUsageLimit, setApprovedUsageLimit] = useState("");
  const [extraCurrentUsage, setExtraCurrentUsage] = useState("");
  const [hardUsageLimit, sethardUsageLimit] = useState("");

  // Invoice
  const [invoiceData, setInvoiceData] = useState([]);

  // Product
  const [productId, setProductId] = useState("");
  const [planName, setPlanName] = useState("");
  const [baseReview, setBaseReview] = useState("");
  const [extraCreditCost, setExtraCreditCost] = useState("");

  // Handler function to update the state when the Switch is toggled
  const handleSwitchChange = () => {
    const subscriptionsStatus = localStorage.getItem("subscriptionsStatus");
    if(subscriptionsStatus !== "trialing"){
      setUsageBasedPricing(!usageBasedPricing);
    }
  };

  // we will get userId from loacalStorage

  let userId = ""

  if (typeof window !== 'undefined') {
  userId = localStorage.getItem("userId");
  }

  useEffect(() => {
    if (userId) {
      usageByuserHandler();
      invoiceDataHandler();
      subscriptionsDataHandler();
    }
  }, []);

  // get user usageDetails by userId
  const usageByuserHandler = async () => {
    const { data, error } = await supabase
      .from("user_usage")
      .select("*")
      .eq("user_id", userId);
    if(!error){
      setUsageDetails(data[0]);
      sethardUsageLimit(data[0]?.hard_usage_limit);
      setExtraCurrentUsage(data[0]?.extra_current_usage);
      setApprovedUsageLimit(data[0]?.approved_usage_limit);
      // usage_based_pricing
      setUsageBasedPricing(data[0]?.usage_based_pricing);
      setReviewUsage(data[0]?.reviews_used);
    }
  };

  // Invoice Handler
  const invoiceDataHandler = async () => {
    try {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", userId);
      setInvoiceData(data);
    } catch (err) {
      console.error("An error occurred while fetching invoice data:", err);
    }
  };

  // subscription
  const subscriptionsDataHandler = async () => {
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId);

      if (error) {
      } else {
        setProductId(data[0]?.product_id);
        productDataHandler(data[0]?.product_id);
      }
    } catch (error) {
      errorNotification(error.message || "something_Went_Wrong");
    }
  };

  // need to keep this code commented
  const productDataHandler = async (pId) => {
    try {
      if (userId) {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", pId);

        if (error) {
          errorNotification(error.message);
        } else {
          setPlanName(data[0]?.name);
          setBaseReview(data[0]?.metadata.base_reviews);
          setExtraCreditCost(data[0]?.metadata.extra_credit_cost);
        }
      }
    } catch (error) {
      errorNotification(error.message || "Something_went_wrong");
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
        Usage
      </Typography>
      <Divider />
      <Box>
        <Typography
          fontSize={"20px"}
          fontWeight={"600"}
          lineHeight={"30px"}
          marginY={2}
          marginLeft={4}
        >
          Credit Usage
        </Typography>
        <Box
          sx={{
            background: "#eeeeee",
            padding: "25px 35px 15px",
            borderRadius: "10px",
          }}
          marginX={3}
        >
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <BorderLinearProgress
              variant="determinate"
              value={50}
              sx={{ width: "100%", color: "#7a52f4" }}
            />
            <Typography width={"25%"} textAlign={"end"}>
              {`${reviewUsage ? reviewUsage : 0} / ${
                baseReview ? baseReview : 0
              } credits`}
            </Typography>
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={2}
            justifyContent={"space-between"}
            marginTop={3}
          >
            <Typography>{`Up to ${
              baseReview ? baseReview : 0
            } on ${planName}`}</Typography>
            <CommonButton
              buttonName="Upgrade"
              style={{
                borderRadius: "6px",
                padding: "5px 15px",
                backgroundColor: "#700f70",
              }}
            />
          </Stack>
        </Box>
      </Box>
      <Box marginY={2} marginLeft={4}>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <Typography fontSize={"20px"} fontWeight={600}>
            Usage-based Pricing{" "}
          </Typography>
          <FormControlLabel
            sx={{ margin: "0" }}
            control={
              <Switch
                color="primary"
                // here we put true False from data base
                checked={usageBasedPricing}
                // keep this code comment
                onChange={handleSwitchChange}
              />
            }
          />
          <Typography>Disabled</Typography>
        </Stack>
        <Typography fontSize={"13px"} marginY={1}>
          This will enable usage based pricing that will be utilised after all
          your credits are used.
        </Typography>
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <Typography fontSize={"15px"} fontWeight={600}>
            $0.20 / feedback
          </Typography>
          <Typography fontSize={"13px"}>
            {`Pricing as per ${planName} Upgrade for lower price.`}
            <Link href="#">Upgrade now</Link>{" "}
          </Typography>
        </Stack>
      </Box>
      {usageBasedPricing && (
        <Box marginY={6} marginX={4}>
          <Stack gap={"5px"}>
            <Typography fontSize={"15px"} fontWeight={600}>
              Approved Usage Limit
            </Typography>
            <Typography fontSize={"13px"}>
              The maximum usage Andromeda Intelligence allows for your account
              each month. <Link href="#">Request Increase</Link>{" "}
            </Typography>
            <Typography fontSize={"15px"} fontWeight={600}>
              {`$ ${approvedUsageLimit ? approvedUsageLimit : 0}`}
            </Typography>
          </Stack>
          <Stack marginY={4} gap={"5px"}>
            <Typography fontSize={"15px"} fontWeight={600}>
              Your current usage
            </Typography>
            <Typography fontSize={"13px"}>
              Your total usage so far in July. This only includes usage beyond
              your monthly credits.
            </Typography>
            <Typography fontSize={"15px"} fontWeight={600}>
              {` $ ${extraCurrentUsage * extraCreditCost}`}
            </Typography>
            <Typography fontSize={"15px"} fontWeight={500}>
              (<Link href="#">{extraCurrentUsage}</Link> feedbacks analyzed so
              far)
            </Typography>
          </Stack>
          <Stack gap={"5px"}>
            <Typography fontSize={"15px"} fontWeight={600}>
              Usage Limit (If enabled)
            </Typography>
            <Typography fontSize={"13px"}>
              When your account reaches this usage threshold each month,
              subsequent requests will be rejected.
            </Typography>
            <CommonInput
              value={`$ ${approvedUsageLimit !== undefined ? approvedUsageLimit : 0}`}
              style={{ width: "300px" }}
            />
          </Stack>
        </Box>
      )}
      <Box marginTop={5} marginBottom={3} marginLeft={4}>
        <Typography fontSize={"25px"} fontWeight={600} color={"#030303"}>
          Invoice History
        </Typography>
      </Box>
      <Box marginY={3} marginX={3}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Invoice</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Created</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData?.map((res) => {
                console.log("res-->",res);
                const paymentStatus = res.payment_status;
                var status = getInvoiceStatus(
                  paymentStatus == "paid" ? true : false
                );
                return (
                  <StyledTableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {res.invoice_id ? res.invoice_id : "-"}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <StyledChip label={paymentStatus} sx={status?.styles} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {`$ ${res.amount}`}
                    </TableCell>
                    <TableCell component="th" scope="row">
                    {moment(res?.created_at).format('D MMMM YYYY, HH:mm')}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Stack flexDirection={"row"} gap={3}>
                        <Link target="_blank" href={res.view_url}>
                          View
                        </Link>
                        {paymentStatus !== "paid" && (
                          <Link target="_blank" href={res.pay_url}>
                            Pay
                          </Link>
                        )}
                      </Stack>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
              {invoiceData?.length === 0 && (
                <TableRow>
                  <TableCell
                    sx={{
                      color: "silver",
                      textAlign: "center !important",
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
  );
};

export default Usage;
