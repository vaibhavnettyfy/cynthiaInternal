"use client";
import TrendsReport from '@/components/trends-report/TrendsReport'
import Head from 'next/head';
import React from 'react'
import {Helmet} from "react-helmet"

const Page = () => {
  return (
    <>
   <Helmet>
        <meta charSet="utf-8" />
        <title>{"Trend & Report"}</title>
        {/* <meta name="description" content={description} /> */}
      </Helmet>
    <TrendsReport/>
    </>
  )
}

export default Page