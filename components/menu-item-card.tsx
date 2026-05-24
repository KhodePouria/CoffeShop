"use client"

import type React from "react"
import Image from "next/image"
import type { MenuItem } from "@/lib/types"
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
    <div
      className="group relative cursor-pointer p-2.5 rounded-[2.5rem] bg-background/40 dark:bg-background/10 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] hover:bg-background/60 dark:hover:bg-background/20 active:scale-[0.97]"
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/20 dark:from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

      <div className="relative aspect-square sm:aspect-4/3 w-full overflow-hidden rounded-[2rem] bg-muted/30">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 left-3 h-10 w-10 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg hover:bg-white/30 dark:hover:bg-black/50 transition-all duration-300 z-10"
          onClick={handleFavouriteClick}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${favourite ? "fill-red-500 text-red-500 scale-110 drop-shadow-md" : "text-white drop-shadow-sm"
              }`}
          />
        </Button>
      </div>

      <div className="p-4 pt-5 pb-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-lg leading-tight line-clamp-1 min-w-0 tracking-tight text-foreground/90">
              {item.name}
            </h3>
            <span className="text-foreground font-bold text-lg whitespace-nowrap tracking-tighter" dir="rtl">
              {toPersianDigits(item.price.toFixed(3))} <span className="text-xs font-medium text-muted-foreground mr-0.5">تومان</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground/60 line-clamp-2 leading-relaxed font-medium">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}
