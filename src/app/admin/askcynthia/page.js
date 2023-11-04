"use client";
import WithAuth from '@/components/WithAuth'
import AskCynthia from '@/components/askcynthia/AskCynthia'
import React from 'react'

const page = () => {
  return (
    <AskCynthia/>
  )
}

export default WithAuth(page)