"use client"

import Image from "next/image"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"
import { useFavourites } from "@/lib/favourites-store"
import { formatPersianPrice, serveImage } from "@/lib/utils"
import { ProductModel } from "@/api/Api"

interface ItemDetailDrawerProps {
  item: ProductModel | null
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
      <DrawerContent className="max-w-2xl mx-auto w-full border-none bg-background backdrop-blur-xl shadow-2xl rounded-t-[2rem]! overflow-hidden">

        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 h-1.5 w-12 rounded-full bg-white/60 backdrop-blur-md shadow-sm" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white/80! hover:scale-105 transition-all duration-300"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="relative flex flex-col h-full max-h-[85vh]">

          <div className="relative h-[35vh] min-h-[250px] w-full shrink-0">
            <Image
              src={serveImage(item.imageUrl || '') || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t -mb-1 from-background via-background/70 to-transparent" />

          </div>

          <div className="flex flex-col flex-1 px-6 pb-8 -mt-6 relative z-10 overflow-y-auto scrollbar-hide">
            <DrawerHeader className="p-0 mb-4 text-start">
              <div className="flex flex-col gap-2">
                <DrawerTitle className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                  {item.title}
                </DrawerTitle>
                <span className="text-xl font-semibold text-primary/90" >
                  {formatPersianPrice(item.price)} <span className="text-xs font-medium text-muted-foreground mr-0.5">تومان</span>
                </span>
              </div>
            </DrawerHeader>

            <p className="text-muted-foreground/80 text-base leading-relaxed mb-8">
              {item.description}
            </p>

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

              <Button
                asChild
                className="flex-1 h-14 rounded-full text-lg  text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
              >
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
