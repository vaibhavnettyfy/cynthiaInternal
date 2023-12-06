"use client";
import React from "react";
import UploadIntegration from "@/components/uploadIntegration/UploadIntegration";
import WithAuth from "@/components/WithAuth";
import { Helmet } from "react-helmet";
const page = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Upload"}</title>
        {/* <meta name="description" content={description} /> */}
      </Helmet>
      <UploadIntegration />
    </>
  );
};

export default WithAuth(page);
