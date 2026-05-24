import React from "react"
import PaginationSSR from "@/components/PaginationSSR"

import { readImages } from "./actions/action"
import GalleryShow from "@/components/dashboard/gallery-show"



export default async function Page({ searchParams }: { searchParams: any }) {
  const params = await searchParams
  if (!params.page)
    params.page = 1
  const itemsPerPage = 12

  /* const allImages = await readImages({
    pagination: {
      take: itemsPerPage,
      skip: (params.page - 1) * itemsPerPage
    }
  }) */
  const allImages = { data: [], count: 0 }

  return (
    <div className="container flex flex-col justify-center w-full mx-auto mb-10">
      <GalleryShow data={allImages.data || []} />
      <PaginationSSR itemsPerPage={itemsPerPage} totalItems={allImages.count} searchParams={searchParams} />
    </div>
  )
}