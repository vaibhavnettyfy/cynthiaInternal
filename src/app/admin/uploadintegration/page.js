"use client";
import React from 'react'
import UploadIntegration from '@/components/uploadIntegration/UploadIntegration'
import WithAuth from '@/components/WithAuth'

const page = () => {
  return (
    <UploadIntegration/>
  )
}

export default WithAuth(page);