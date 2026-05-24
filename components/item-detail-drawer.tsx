"use client"

import Image from "next/image"
import type { MenuItem } from "@/lib/types"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"
import { useFavourites } from "@/lib/favourites-store"
import { toPersianDigits } from "@/lib/utils"

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
      <DrawerContent className="max-w-md mx-auto w-full border-none bg-background backdrop-blur-xl shadow-2xl rounded-t-[2.5rem] overflow-hidden">

        {/* Floating Custom Handle on top of the image */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 h-1.5 w-12 rounded-full bg-white/60 backdrop-blur-md shadow-sm" />

        {/* Floating Frosted Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 hover:scale-105 transition-all duration-300"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="relative flex flex-col h-full max-h-[85vh]">

          {/* Image Section completely flush to the top */}
          <div className="relative h-[35vh] min-h-[250px] w-full shrink-0">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient mask to blend image into background */}
            <div className="absolute inset-0 bg-gradient-to-t -mb-1 from-background via-background/70 to-transparent" />

          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-1 px-6 pb-8 -mt-6 relative z-10 overflow-y-auto scrollbar-hide">
            <DrawerHeader className="p-0 mb-4 text-start">
              <div className="flex flex-col gap-2">
                <DrawerTitle className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                  {item.name}
                </DrawerTitle>
                <span className="text-xl font-semibold text-primary/90" dir="ltr">
                  {toPersianDigits(item.price.toFixed(3))} تومان
                </span>
              </div>
            </DrawerHeader>

            <p className="text-muted-foreground/80 text-base leading-relaxed mb-8">
              {item.description}
            </p>

            {/* Sticky-feeling Action Area */}
            <div className="mt-auto pt-4 flex gap-3 items-center w-full">
              <Button
                variant="outline"
                size="icon"
                className={`h-14 w-14 shrink-0 rounded-full border-2 transition-all duration-300 ${favourite
                  ? "border-red-500 bg-red-50 hover:bg-red-100"
                  : "border-border hover:bg-muted"
                  }`}
                onClick={handleFavouriteClick}
              >
                <Heart
                  className={`h-6 w-6 transition-all duration-300 ${favourite ? "fill-red-500 text-red-500 scale-110" : "text-foreground"
                    }`}
                />
              </Button>

              {/* Phone Order Button */}
              <Button
                asChild
                className="flex-1 h-14 rounded-full text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Replace the number below with your actual phone number */}
                <a href="tel:02112345678">
                  تماس برای سفارش
                </a>
              </Button>
            </div>
          </div>

        </div>
      </DrawerContent>
    </Drawer>
  )
}
