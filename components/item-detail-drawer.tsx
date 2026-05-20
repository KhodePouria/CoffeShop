"use client"

import Image from "next/image"
import type { MenuItem } from "@/lib/types"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"
import { useFavourites } from "@/lib/favourites-store"

interface ItemDetailDrawerProps {
  item: MenuItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ItemDetailDrawer({ item, open, onOpenChange }: ItemDetailDrawerProps) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites()

  if (!item) return null

  const favourite = isFavourite(item.id)

  const handleFavouriteClick = () => {
    if (favourite) {
      removeFavourite(item.id)
    } else {
      addFavourite(item.id)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-md mx-auto">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>

          <div className="p-6">
            <DrawerHeader className="p-0 mb-4">
              <div className="flex items-start justify-between gap-4">
                <DrawerTitle className="text-2xl font-bold leading-tight">{item.name}</DrawerTitle>
                <span className="text-2xl font-bold text-primary whitespace-nowrap" dir="ltr">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </DrawerHeader>

            <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>

            <div className="flex gap-3">
              <Button className="flex-1" size="lg">
                افزودن به سفارش
              </Button>
              <Button variant="outline" size="lg" className="px-6 bg-transparent" onClick={handleFavouriteClick}>
                <Heart className={`h-5 w-5 ${favourite ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
