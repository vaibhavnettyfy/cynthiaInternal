"use client";
import WithAuth from "@/components/WithAuth";
import AskCynthia from "@/components/askcynthia/AskCynthia";
import Head from "next/head";
import React from "react";
import { Helmet } from "react-helmet";

const page = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Ask Cynthia"}</title>
        {/* <meta name="description" content={description} /> */}
      </Helmet>
      <AskCynthia />
    </>
  );
};

export default WithAuth(page);
