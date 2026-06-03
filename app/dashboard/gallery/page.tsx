import React from "react"
import PaginationSSR from "@/components/PaginationSSR"
import { readImages } from "./actions/action"
import GalleryShow from "@/components/dashboard/gallery-show"

export default async function Page({ searchParams }: { searchParams: any }) {
  const params = await searchParams
  if (!params.page)
    params.page = 1
  const itemsPerPage = 6
  const imageRes = await readImages({
    pagination: {
      take: itemsPerPage,
      skip: (params.page - 1) * itemsPerPage
    }
  })
  const allImages = imageRes.data || { data: [], count: 0 }
  return (
    <div className="container flex flex-col justify-center w-full mx-auto mb-10">
      <GalleryShow data={allImages.data || []} />
      {((allImages?.count || 0) > itemsPerPage) && <PaginationSSR itemsPerPage={itemsPerPage} totalItems={allImages?.count || 0} searchParams={searchParams} />}
    </div>
  )
}