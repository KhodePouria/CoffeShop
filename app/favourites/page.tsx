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
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">علاقه‌مندی‌ها</h1>
            <ThemeToggle />
          </div>
          <p className="text-sm text-muted-foreground text-center">موارد ذخیره شده شما</p>
        </div>
      </header>

      <main className="max-w-md mx-auto py-6 px-4">
        {favouriteItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">هنوز علاقه‌مندی ندارید</h2>
            <p className="text-muted-foreground">با ضربه زدن روی آیکون قلب، موارد را به علاقه‌مندی‌های خود اضافه کنید</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
