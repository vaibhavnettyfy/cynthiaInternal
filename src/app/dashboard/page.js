"use client"
import UploadIntegration from "@/components/uploadIntegration/UploadIntegration";
import {Helmet} from "react-helmet"

export default function Home() {
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>{"Upload"}</title>
        {/* <meta name="description" content={description} /> */}
      </Helmet>
    <UploadIntegration />
    </>
  )
}
