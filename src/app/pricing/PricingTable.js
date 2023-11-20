"use client";
import React from "react";

const PricingTable = () => {
  return (
    <>
    <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
    <stripe-pricing-table pricing-table-id="prctbl_1O7tznSCkgVAHKZaklCnfETC"
    publishable-key="pk_test_51Mx64MSCkgVAHKZaQ4sV708QaKgiVlZ81w8sQGIB9xKPN1KZOhQ7ePFwhlvnXSNXkErOVqmNOnGBSbkWpDk3LKSf00lOTYANi7"
    customer-email="{{CUSTOMER_EMAIL}}">
    </stripe-pricing-table>
    </>
  );
};

export default PricingTable;
