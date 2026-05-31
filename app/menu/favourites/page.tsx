"use client"

import { useFavourites } from "@/lib/favourites-store"
import { menuItems } from "@/lib/menu-data"
import { MenuItemCard } from "@/components/menu-item-card"
import { ItemDetailDrawer } from "@/components/item-detail-drawer"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import type { MenuItem } from "@/lib/types"
import { Heart } from "lucide-react"

export default function FavouritesPage() {
  const { favourites } = useFavourites()
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const favouriteItems = menuItems.filter((item) => favourites.includes(item.id))

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-balance">علاقه‌مندی‌ها</h1>
            <ThemeToggle />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground text-center text-balance">موارد ذخیره شده شما</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {favouriteItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">هنوز علاقه‌مندی ندارید</h2>
            <p className="text-muted-foreground text-balance">
              با ضربه زدن روی آیکون قلب، موارد را به علاقه‌مندی‌های خود اضافه کنید
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favouriteItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onClick={() => handleItemClick(item)} />
            ))}
          </div>
        )}
      </main>

      <ItemDetailDrawer item={selectedItem} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
