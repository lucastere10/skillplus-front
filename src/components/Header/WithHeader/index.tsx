'use client'

import { usePathname } from "next/navigation"
import React, { FC } from "react"
import { PageHeader } from ".."


export const WithHeader: FC<unknown> = () => {
  const pathname = usePathname()
  const pathsToHideHeader = ['/login', '/register', '/upload-picture', '/complete-profile'];

  const hideHeader = pathsToHideHeader.some(path => pathname.startsWith(path));

  return (
    <>
      {!hideHeader && <PageHeader/>}
    </>
  )
}
