"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const PricingTable = () => {
  const [userEmailId,setUserEmailId] = useState("");
  let userEmail = ""
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      userEmail = localStorage.getItem("userEmail");
      setUserEmailId(userEmail);
    }
  },[]);
  return (
    <Box
      height={"100vh"}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        background: "rgb(250, 250, 250)",
      }}
    >
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        pricing-table-id="prctbl_1O7tznSCkgVAHKZaklCnfETC"
        publishable-key="pk_test_51Mx64MSCkgVAHKZaQ4sV708QaKgiVlZ81w8sQGIB9xKPN1KZOhQ7ePFwhlvnXSNXkErOVqmNOnGBSbkWpDk3LKSf00lOTYANi7"
        customer-email={userEmailId}
      ></stripe-pricing-table>
    </Box>
  );
};

export default PricingTable;
