"use client"
import UploadIntegration from "@/components/uploadIntegration/UploadIntegration";

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
