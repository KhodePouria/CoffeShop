"use client"

import { ObjectModel } from "@/api/Api"
import UploadImageDialog from "./UploadImageDialog"
import Image from "next/image"
import { ImageIcon, Plus, RabbitIcon } from "lucide-react"
import { serveImage } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationEllipsis, PaginationLink, PaginationNext } from "./ui/pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Badge } from "./ui/badge"
import { readImages } from "@/app/dashboard/gallery/actions/action"

interface GalleryProps {
	children?: React.ReactNode
	selectedImages: string[]
	setSelectedImages: (updated: string[]) => void
	singleSelect?: boolean
}

function SelectImages({ children, selectedImages, setSelectedImages, singleSelect = false }: GalleryProps) {
	const [images, setImages] = useState<ObjectModel[]>([])
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const [fetchTrigger, setFetchTrigger] = useState(0)

	useEffect(() => {
		setImages([])
		async function fetchImages() {
			const data = await readImages({ pagination: { take: 16, skip: (currentPage - 1) * 16 } })
			setImages(data.data?.data || [])
			setTotalPages(Math.ceil((data.data?.count || 1) / 16))
		}
		fetchImages()
	}, [currentPage, fetchTrigger])

	const changeImages = (val: boolean, item: ObjectModel) => {
		if (singleSelect) {
			setSelectedImages(val ? [item.id] : [])
		} else {
			const updated = val
				? selectedImages.includes(item.id) ? selectedImages : [...selectedImages, item.id]
				: selectedImages.filter((i) => i !== item.id)
			setSelectedImages(updated)
		}
	}

	const handleUploadComplete = async () => {
		const data = await readImages({ pagination: { take: 1, skip: 0 } })
		const latestImage = data.data?.data[0]
		if (latestImage) {
			if (singleSelect) {
				setSelectedImages([latestImage.id])
			} else if (!selectedImages.includes(latestImage.id)) {
				setSelectedImages([...selectedImages, latestImage.id])
			}
		}
		setFetchTrigger((prev) => prev + 1)
		setCurrentPage(1)
	}

	const buildPaginationRange = (
		totalPages: number,
		currentPage: number,
		siblingCount = 1,
	): Array<number | "ellipsis"> => {
		const totalNumbers = siblingCount * 2 + 5
		if (totalNumbers >= totalPages)
			return Array.from({ length: totalPages }, (_, i) => i + 1)

		const leftSibling = Math.max(currentPage - siblingCount, 1)
		const rightSibling = Math.min(currentPage + siblingCount, totalPages)
		const showLeftEllipsis = leftSibling > 2
		const showRightEllipsis = rightSibling < totalPages - 1

		if (!showLeftEllipsis && showRightEllipsis) {
			const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1)
			return [...leftRange, "ellipsis", totalPages]
		}
		if (showLeftEllipsis && !showRightEllipsis) {
			const rightRange = Array.from(
				{ length: 3 + siblingCount * 2 },
				(_, i) => totalPages - (2 + siblingCount * 2) + i,
			)
			return [1, "ellipsis", ...rightRange]
		}
		return [
			1,
			"ellipsis",
			...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i),
			"ellipsis",
			totalPages,
		]
	}

	const paginationRange = buildPaginationRange(totalPages, currentPage)
	const selectedCount = selectedImages.length

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className=" mx-auto sm:mx-auto p-0 overflow-hidden gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

				{/* Header */}
				<DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b space-y-0">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
							<ImageIcon className="size-4 text-primary" />
						</div>
						<div>
							<DialogTitle className="text-base font-semibold">انتخاب تصویر</DialogTitle>
							{selectedCount > 0 && (
								<p className="text-xs text-muted-foreground mt-0.5">
									{selectedCount} تصویر انتخاب شده
								</p>
							)}
						</div>
					</div>

					<UploadImageDialog onUploadComplete={handleUploadComplete}>
						<Button type="button" size="sm" className="gap-2">
							<Plus className="size-4" />
							آپلود تصویر
						</Button>
					</UploadImageDialog>
				</DialogHeader>

				{/* Grid */}
				<div className="p-6 min-h-[360px]">
					{images.length === 0 ? (
						<div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
							<div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted">
								<RabbitIcon className="size-8" />
							</div>
							<p className="text-base font-medium">تصویری وجود ندارد</p>
							<p className="text-sm">برای شروع یک تصویر آپلود کنید</p>
						</div>
					) : (
						<div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
							{images.map((item) => {
								const checked = selectedImages.includes(item.id)
								return (
									<div
										key={item.id}
										onClick={() => changeImages(!checked, item)}
										className={`
                      group relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-150
                      ${checked
												? "border-primary ring-2 ring-primary/20 shadow-md"
												: "border-transparent hover:border-primary/40 hover:shadow-sm"
											}
                    `}
									>
										<Image
											src={serveImage(item.id)}
											width={300}
											height={300}
											alt={String(item.name) || ""}
											className="aspect-square object-cover w-full transition-transform duration-200 group-hover:scale-105"
										/>

										{/* Overlay */}
										<div className={`
                      absolute inset-0 transition-opacity duration-150
                      ${checked ? "bg-primary/10 opacity-100" : "bg-black/0 group-hover:bg-black/20 opacity-100"}
                    `} />

										{/* Checkbox badge */}
										<div className={`
                      absolute top-2 right-2 transition-all duration-150
                      ${checked ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}
                    `}>
											<div
												className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm"
												onClick={(e) => e.stopPropagation()}
											>
												<Checkbox
													checked={checked}
													onCheckedChange={(val) => changeImages(!!val, item)}
													className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary w-4 h-4"
												/>
											</div>
										</div>

										{/* Selected badge */}
										{checked && (
											<div className="absolute bottom-2 left-2">
												<Badge className="text-[10px] px-1.5 py-0.5 h-auto bg-primary text-primary-foreground">
													انتخاب شده
												</Badge>
											</div>
										)}
									</div>
								)
							})}
						</div>
					)}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="border-t px-6 py-3 bg-muted/30">
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
										className={currentPage === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
									/>
								</PaginationItem>

								{paginationRange.map((item, index) => {
									if (item === "ellipsis") {
										return (
											<PaginationItem key={`ellipsis-${index}`}>
												<PaginationEllipsis />
											</PaginationItem>
										)
									}
									const page = item as number
									return (
										<PaginationItem key={page}>
											<PaginationLink
												isActive={currentPage === page}
												onClick={() => setCurrentPage(page)}
												className="cursor-pointer"
											>
												{page}
											</PaginationLink>
										</PaginationItem>
									)
								})}

								<PaginationItem>
									<PaginationNext
										onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
										className={currentPage === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default SelectImages
