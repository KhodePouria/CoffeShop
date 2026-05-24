"use client"

import type React from "react"

import Image from "next/image"
import type { MenuItem } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { useFavourites } from "@/lib/favourites-store"
import { Button } from "@/components/ui/button"
import { toPersianDigits } from "@/lib/utils"

interface MenuItemCardProps {
  item: MenuItem
  onClick: () => void
}

export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites()
  const favourite = isFavourite(item.id)

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (favourite) {
      removeFavourite(item.id)
    } else {
      addFavourite(item.id)
    }
  }

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl group"
      onClick={onClick}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={handleFavouriteClick}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${favourite ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        </Button>
      </div>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3 mb-2 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg leading-tight line-clamp-1 min-w-0">
            {item.name}
          </h3>
          <span className="text-primary font-bold text-base sm:text-lg whitespace-nowrap" dir="rtl">
            {toPersianDigits(item.price.toFixed(2))} تومان
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 wrap-break-word">{item.description}</p>
      </CardContent>
    </Card>
  )
}
