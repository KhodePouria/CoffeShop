"use client"

import React from "react"
import Image from "next/image"

interface GalleryImageCardProps {
    image: string
}

export function GalleryImageCard({ image }: GalleryImageCardProps) {

    return (
        <div className="relative overflow-hidden transition-all duration-300 border shadow-sm aspect-square rounded-2xl border-border/50 bg-secondary/30 group hover:shadow-md hover:-translate-y-1">
            <Image
                src={image}
                alt={image || "Gallery image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
        </div>
    )
}
