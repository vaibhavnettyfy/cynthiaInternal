"use client";
import Settings from '@/components/settings/Settings'
import React from 'react'
import {Helmet} from "react-helmet";

const page = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>{"Settings"}</title>
        {/* <meta name="description" content={description} /> */}
      </Helmet>
    <Settings/>
    </>
  )
}

export default page